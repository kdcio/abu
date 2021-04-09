import parser from "@kdcio/api-gw-req";
import response from "@kdcio/api-gw-resp";
import { makeFakeEvent } from "helper";
import makeUpload from "../../../src/controller/upload";

let upload = null;
describe("Admin Upload", () => {
  beforeAll(() => {
    upload = makeUpload({ upload: () => {}, parser, response });
  });

  it("should throw unauthrozied", async () => {
    expect.assertions(1);
    try {
      await upload({
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
        httpMethod: "GET",
        requestContext: {
          authorizer: {
            claims: {
              sub: "user",
              "cognito:groups": ["client"],
            },
          },
        },
      });
      await upload({ event });
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
        httpMethod: "GET",
        requestContext: {
          authorizer: {
            claims: {
              sub: "user",
            },
          },
        },
      });
      await upload({ event });
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
        httpMethod: "GET",
        requestContext: {
          authorizer: {
            claims: {
              sub: "user",
              "cognito:groups": ["editor"],
            },
          },
        },
      });
      await upload({ event });
    } catch (error) {
      expect(error.message).toBe("Missing model id");
    }
  });

  it("should throw missing filename", async () => {
    expect.assertions(1);
    try {
      const event = makeFakeEvent({
        path: "/",
        headers: { "Content-Type": "application/json" },
        httpMethod: "GET",
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
      await upload({ event });
    } catch (error) {
      expect(error.message).toBe("Missing filename");
    }
  });

  it("should throw missing type", async () => {
    expect.assertions(1);
    try {
      const event = makeFakeEvent({
        path: "/",
        headers: { "Content-Type": "application/json" },
        httpMethod: "GET",
        pathParameters: { modelId: "blog" },
        queryStringParameters: { filename: "test.jpg" },
        requestContext: {
          authorizer: {
            claims: {
              sub: "user",
              "cognito:groups": ["editor"],
            },
          },
        },
      });
      await upload({ event });
    } catch (error) {
      expect(error.message).toBe("Missing type");
    }
  });
});
