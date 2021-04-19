import parser from "@kdcio/api-gw-req";
import response from "@kdcio/api-gw-resp";
import { makeFakeEvent } from "helper";
import makePost from "../../../src/controller/post";

let post = null;
describe("Admin Seed Content", () => {
  beforeAll(() => {
    post = makePost({ create: () => {}, parser, response });
  });

  it("should throw unauthrozied", async () => {
    expect.assertions(1);
    try {
      await post({
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
        httpMethod: "POST",
        requestContext: {
          authorizer: {
            claims: {
              sub: "user",
              "cognito:groups": ["client"],
            },
          },
        },
      });
      await post({ event });
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
        httpMethod: "POST",
        requestContext: {
          authorizer: {
            claims: {
              sub: "user",
            },
          },
        },
      });
      await post({ event });
    } catch (error) {
      expect(error.message).toMatch(/forbidden/i);
    }
  });
});
