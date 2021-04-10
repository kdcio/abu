import { handler } from "../src/origin-request";

describe("Origin request", () => {
  it("should run", async () => {
    const event = {
      Records: [
        {
          cf: {
            request: {},
          },
        },
      ],
    };
    const context = {};
    const callback = jest.fn(() => {});
    await handler(event, context, callback);
    expect(callback).toBeCalledTimes(1);
  });
});
