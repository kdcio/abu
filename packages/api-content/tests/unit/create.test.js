import makeCreate from "../../src/use-cases/create";
import { handler } from "../../src/create";

jest.mock("../../src/use-cases/create");

describe("Create content", () => {
  it("should throw unauthrozied", async () => {
    makeCreate.mockImplementation(() => {
      throw new Error("Some kind of error");
    });

    const response = await handler();
    expect(response.statusCode).toEqual(500);
    expect(response.isBase64Encoded).toBe(false);
  });
});
