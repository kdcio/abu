import parser from "@kdcio/api-gw-req";
import response from "@kdcio/api-gw-resp";
import makeRemove from "../../src/controller/delete";

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

  it("should throw Missing id", async () => {
    expect.assertions(1);
    try {
      await remove({
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
      expect(error.message).toBe("Missing model id");
    }
  });
});
