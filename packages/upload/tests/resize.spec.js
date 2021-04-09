import get from "../src/s3/get";
import put from "../src/s3/put";
import convert from "../src/lib/convert";
import { handler } from "../src/resize";

jest.mock("../src/s3/get");
jest.mock("../src/s3/put");
jest.mock("../src/lib/convert");

describe("Resize", () => {
  beforeEach(() => {
    get.mockClear();
    put.mockClear();
    convert.mockClear();
  });

  it("should resize", async () => {
    const targets = {
      thumb: `thumb/123-test.webp`,
      orig: `orig/123-test.jpg`,
    };

    get.mockImplementation(() =>
      Promise.resolve({
        ContentType: "image/jpeg",
        Metadata: {
          "Cache-Control": "no-cache",
          "opt-thumb": JSON.stringify({
            width: 400,
            format: "webp",
            target: targets.thumb,
          }),
          "opt-orig": JSON.stringify({
            target: targets.orig,
          }),
        },
        Body: "some image data",
      })
    );

    convert.mockImplementation(() => Promise.resolve("resized buffer"));

    const event = {
      Records: [
        {
          s3: {
            object: {
              key: "uploads/test.jpg",
            },
          },
        },
      ],
    };
    await handler(event);
    expect(put.mock.calls[0][0]).toEqual({
      data: "some image data",
      Key: targets.orig,
    });
    expect(convert.mock.calls[0][0]).toEqual({
      data: "some image data",
      options: {
        width: 400,
        format: "webp",
        target: targets.thumb,
      },
    });
    expect(put.mock.calls[1][0]).toEqual({
      Key: targets.thumb,
      data: "resized buffer",
    });
  });

  it("should not resize because of invalid type", async () => {
    const targets = {
      thumb: `thumb/123-test.webp`,
      orig: `orig/123-test.bmp`,
    };

    get.mockImplementation(() =>
      Promise.resolve({
        ContentType: "image/bmp",
        Metadata: {
          "opt-thumb": JSON.stringify({
            width: 400,
            format: "webp",
            target: targets.thumb,
          }),
          "opt-orig": JSON.stringify({
            target: targets.orig,
          }),
        },
        Body: "some image data",
      })
    );

    const event = {
      Records: [
        {
          s3: {
            object: {
              key: "uploads/test.bmp",
            },
          },
        },
      ],
    };

    await handler(event);
    expect(put).not.toHaveBeenCalled();
    expect(convert).not.toHaveBeenCalled();
  });

  it("should not resize because of get error", async () => {
    get.mockImplementation(() => Promise.reject(new Error("some error")));

    const event = {
      Records: [
        {
          s3: {
            object: {
              key: "uploads/test.bmp",
            },
          },
        },
      ],
    };

    await handler(event);
    expect(put).not.toHaveBeenCalled();
    expect(convert).not.toHaveBeenCalled();
  });
});
