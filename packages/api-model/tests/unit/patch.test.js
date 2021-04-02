import parser from "@kdcio/api-gw-req";
import response from "@kdcio/api-gw-resp";
import makePatchModel from "../../src/controller/patch-model";

let patchModel = null;
describe("Patch Model", () => {
  beforeAll(() => {
    patchModel = makePatchModel({ patch: () => {}, parser, response });
  });

  it("should throw unauthrozied", async () => {
    expect.assertions(1);
    try {
      await patchModel({
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
      await patchModel({
        event: {
          requestContext: {
            identity: {},
            authorizer: { claims: { sub: "tester" } },
          },
          path: "/",
        },
      });
    } catch (error) {
      expect(error.message).toBe("Missing id");
    }
  });
});
