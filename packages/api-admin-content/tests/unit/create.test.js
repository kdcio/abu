import parser from "@kdcio/api-gw-req";
import response from "@kdcio/api-gw-resp";
import makePost from "../../src/controller/post";

let post = null;
describe("Admin Post Content", () => {
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
});
