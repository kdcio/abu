import makeList from "../../src/use-cases/list";
import { handler } from "../../src/list";

jest.mock("../../src/use-cases/list");

describe("List content", () => {
  it("should throw unauthrozied", async () => {
    makeList.mockImplementation(() => {
      throw new Error("Some kind of error");
    });

    const response = await handler();
    expect(response.statusCode).toEqual(500);
    expect(response.isBase64Encoded).toBe(false);
  });
});
