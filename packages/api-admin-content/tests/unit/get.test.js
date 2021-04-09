import parser from "@kdcio/api-gw-req";
import response from "@kdcio/api-gw-resp";
import makeGet from "../../src/controller/get";

let get = null;
describe("Admin Get Content", () => {
  beforeAll(() => {
    get = makeGet({ get: () => {}, parser, response });
  });

  it("should throw unauthrozied", async () => {
    expect.assertions(1);
    try {
      await get({
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
      await get({
        event: {
          requestContext: {
            identity: {},
            authorizer: { claims: { sub: "tester" } },
          },
          path: "/",
        },
      });
    } catch (error) {
      expect(error.message).toBe("Missing model id");
    }
  });
});
