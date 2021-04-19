import makeDelete from "../../src/use-cases/delete";
import { handler } from "../../src/reset";

jest.mock("../../src/use-cases/delete");

describe("Delete access", () => {
  it("should throw unauthrozied", async () => {
    makeDelete.mockImplementation(() => {
      throw new Error("Some kind of error");
    });

    const response = await handler();
    expect(response.statusCode).toEqual(500);
    expect(response.isBase64Encoded).toBe(false);
  });
});
