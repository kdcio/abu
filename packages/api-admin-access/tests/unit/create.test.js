import parser from "@kdcio/api-gw-req";
import response from "@kdcio/api-gw-resp";
import makePostModel from "../../src/controller/post-model";

let postModel = null;
describe("Post Model", () => {
  beforeAll(() => {
    postModel = makePostModel({ create: () => {}, parser, response });
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
