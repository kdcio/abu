import makeUpdate from "../../src/use-cases/update";
import { handler } from "../../src/update";

jest.mock("../../src/use-cases/update");

describe("Update content", () => {
  it("should throw unauthrozied", async () => {
    makeUpdate.mockImplementation(() => {
      throw new Error("Some kind of error");
    });

    const response = await handler();
    expect(response.statusCode).toEqual(500);
    expect(response.isBase64Encoded).toBe(false);
  });
});
