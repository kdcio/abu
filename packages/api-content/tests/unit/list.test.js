import parser from "@kdcio/api-gw-req";
import response from "@kdcio/api-gw-resp";
import makeListModels from "../../src/controller/list-models";

let listModels = null;
describe("List Models", () => {
  beforeAll(() => {
    listModels = makeListModels({ list: () => {}, parser, response });
  });

  it("should throw unauthrozied", async () => {
    expect.assertions(1);
    try {
      await listModels({
        event: {
          requestContext: {},
        },
      });
    } catch (error) {
      expect(error.message).toBe("Unauthorized");
    }
  });
});
