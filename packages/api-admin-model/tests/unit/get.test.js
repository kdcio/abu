import parser from "@kdcio/api-gw-req";
import response from "@kdcio/api-gw-resp";
import makeGetModel from "../../src/controller/get-model";

let getModel = null;
describe("Get Model", () => {
  beforeAll(() => {
    getModel = makeGetModel({ get: () => {}, parser, response });
  });

  it("should throw unauthrozied", async () => {
    expect.assertions(1);
    try {
      await getModel({
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
      await getModel({
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
