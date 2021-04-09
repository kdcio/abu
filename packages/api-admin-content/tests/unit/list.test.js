import parser from "@kdcio/api-gw-req";
import response from "@kdcio/api-gw-resp";
import makeBrowse from "../../src/controller/browse";

let browse = null;
describe("Admin Browse Content", () => {
  beforeAll(() => {
    browse = makeBrowse({ list: () => {}, parser, response });
  });

  it("should throw unauthrozied", async () => {
    expect.assertions(1);
    try {
      await browse({
        event: {
          requestContext: {},
        },
      });
    } catch (error) {
      expect(error.message).toBe("Unauthorized");
    }
  });
});
