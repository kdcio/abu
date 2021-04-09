import makeSignedUrl from "../../src/use-cases/signed-url";
import { handler } from "../../src/upload";

jest.mock("../../src/use-cases/signed-url");

describe("Upload image", () => {
  it("should throw unauthrozied", async () => {
    makeSignedUrl.mockImplementation(() => {
      throw new Error("Some kind of error");
    });

    const response = await handler();
    expect(response.statusCode).toEqual(500);
    expect(response.isBase64Encoded).toBe(false);
  });
});
