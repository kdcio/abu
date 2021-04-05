import parser from "@kdcio/api-gw-req";
import response from "@kdcio/api-gw-resp";
import makeRemoveModel from "../../src/controller/remove-model";

let removeModel = null;
describe("Remove Model", () => {
  beforeAll(() => {
    removeModel = makeRemoveModel({ remove: () => {}, parser, response });
  });

  it("should throw unauthrozied", async () => {
    expect.assertions(1);
    try {
      await removeModel({
        event: {
          requestContext: {},
        },
      });
    } catch (error) {
      expect(error.message).toBe("Unauthorized");
    }
  });

  it("should throw Missing id", async () => {
    expect.assertions(1);
    try {
      await removeModel({
        event: {
          requestContext: {
            identity: {},
            authorizer: {
              claims: { sub: "tester", "cognito:groups": ["admin"] },
            },
          },
          path: "/",
        },
      });
    } catch (error) {
      expect(error.message).toBe("Missing id");
    }
  });
});
