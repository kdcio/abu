import parser from "@kdcio/api-gw-req";
import response from "@kdcio/api-gw-resp";
import makePatch from "../../src/controller/patch";

let patch = null;
describe("Admin Patch Content", () => {
  beforeAll(() => {
    patch = makePatch({ patch: () => {}, parser, response });
  });

  it("should throw unauthrozied", async () => {
    expect.assertions(1);
    try {
      await patch({
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
      await patch({
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
