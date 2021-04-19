import makeCreate from "../../src/use-cases/seed";
import { handler } from "../../src/seed";

jest.mock("../../src/use-cases/seed");

describe("Seed", () => {
  it("should throw unauthrozied", async () => {
    makeCreate.mockImplementation(() => {
      throw new Error("Some kind of error");
    });

    const response = await handler();
    expect(response.statusCode).toEqual(500);
    expect(response.isBase64Encoded).toBe(false);
  });
});
