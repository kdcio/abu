import makeRead from "../../src/use-cases/read";
import { handler } from "../../src/read";

jest.mock("../../src/use-cases/read");

describe("Read access", () => {
  it("should throw unauthrozied", async () => {
    makeRead.mockImplementation(() => {
      throw new Error("Some kind of error");
    });

    const response = await handler();
    expect(response.statusCode).toEqual(500);
    expect(response.isBase64Encoded).toBe(false);
  });
});
