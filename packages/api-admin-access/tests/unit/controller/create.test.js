import parser from "@kdcio/api-gw-req";
import response from "@kdcio/api-gw-resp";
import makePost from "../../../src/controller/post";

let postModel = null;
describe("Admin Post Access", () => {
  beforeAll(() => {
    postModel = makePost({ create: () => {}, parser, response });
  });

  it("should throw unauthrozied", async () => {
    expect.assertions(1);
    try {
      await postModel({
        event: {
          requestContext: {},
        },
      });
    } catch (error) {
      expect(error.message).toBe("Unauthorized");
    }
  });
});
