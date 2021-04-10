import parser from "@kdcio/api-gw-req";
import response from "@kdcio/api-gw-resp";
import { makeFakeEvent } from "helper";
import makeRemove from "../../../src/controller/delete";

let remove = null;
describe("Admin Delete Content", () => {
  beforeAll(() => {
    remove = makeRemove({ remove: () => {}, parser, response });
  });

  it("should throw unauthrozied", async () => {
    expect.assertions(1);
    try {
      await remove({
        event: {
          requestContext: {},
        },
      });
    } catch (error) {
      expect(error.message).toBe("Unauthorized");
    }
  });

  it("should throw forbidden for invalid group", async () => {
    expect.assertions(1);
    try {
      const event = makeFakeEvent({
        path: "/",
        pathParameters: { modelId: "blog" },
        headers: { "Content-Type": "application/json" },
        httpMethod: "DELETE",
        requestContext: {
          authorizer: {
            claims: {
              sub: "user",
              "cognito:groups": ["client"],
            },
          },
        },
      });
      await remove({ event });
    } catch (error) {
      expect(error.message).toMatch(/forbidden/i);
    }
  });

  it("should throw forbidden for no group", async () => {
    expect.assertions(1);
    try {
      const event = makeFakeEvent({
        path: "/",
        pathParameters: { modelId: "blog" },
        headers: { "Content-Type": "application/json" },
        httpMethod: "DELETE",
        requestContext: {
          authorizer: {
            claims: {
              sub: "user",
            },
          },
        },
      });
      await remove({ event });
    } catch (error) {
      expect(error.message).toMatch(/forbidden/i);
    }
  });

  it("should throw missing model id", async () => {
    expect.assertions(1);
    try {
      const event = makeFakeEvent({
        path: "/",
        headers: { "Content-Type": "application/json" },
        httpMethod: "DELETE",
        requestContext: {
          authorizer: {
            claims: {
              sub: "user",
              "cognito:groups": ["editor"],
            },
          },
        },
      });
      await remove({ event });
    } catch (error) {
      expect(error.message).toBe("Missing model id");
    }
  });

  it("should throw missing id", async () => {
    expect.assertions(1);
    try {
      const event = makeFakeEvent({
        path: "/",
        headers: { "Content-Type": "application/json" },
        httpMethod: "DELETE",
        pathParameters: { modelId: "blog" },
        requestContext: {
          authorizer: {
            claims: {
              sub: "user",
              "cognito:groups": ["editor"],
            },
          },
        },
      });
      await remove({ event });
    } catch (error) {
      expect(error.message).toBe("Missing id");
    }
  });
});
