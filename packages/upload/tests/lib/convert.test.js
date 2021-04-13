import sharp from "sharp";
import convert from "../../src/lib/convert";

jest.mock("sharp");

describe("Convert", () => {
  beforeEach(() => {
    sharp.mockClear();
  });

  it("should convert with width", () => {
    const toBuffer = jest.fn(() => "resized");
    const toFormat = jest.fn(() => ({ toBuffer }));
    const resize = jest.fn(() => ({ toFormat }));
    sharp.mockImplementation(() => ({ resize }));

    convert({
      data: "some data",
      options: {
        w: 400,
        f: "webp",
        target: "thumb/123-test.webp",
      },
    });

    expect(sharp).toHaveBeenCalled();
    expect(resize).toHaveBeenCalled();
    expect(resize).toBeCalledWith(400);
    expect(toFormat).toHaveBeenCalled();
    expect(toFormat).toBeCalledWith("webp");
    expect(toBuffer).toHaveBeenCalled();
  });

  it("should convert with width and height", () => {
    const toBuffer = jest.fn(() => "resized");
    const toFormat = jest.fn(() => ({ toBuffer }));
    const resize = jest.fn(() => ({ toFormat }));
    sharp.mockImplementation(() => ({ resize }));

    convert({
      data: "some data",
      options: {
        w: 400,
        h: 300,
        f: "webp",
        target: "thumb/123-test.webp",
      },
    });

    expect(sharp).toHaveBeenCalled();
    expect(resize).toHaveBeenCalled();
    expect(resize).toBeCalledWith(400, 300);
    expect(toFormat).toHaveBeenCalled();
    expect(toFormat).toBeCalledWith("webp");
    expect(toBuffer).toHaveBeenCalled();
  });

  it("should convert without resize", () => {
    const toBuffer = jest.fn(() => "resized");
    const toFormat = jest.fn(() => ({ toBuffer }));
    sharp.mockImplementation(() => ({ toFormat }));

    convert({
      data: "some data",
      options: {
        f: "webp",
        target: "thumb/123-test.webp",
      },
    });

    expect(sharp).toHaveBeenCalled();
    expect(toFormat).toHaveBeenCalled();
    expect(toFormat).toBeCalledWith("webp");
    expect(toBuffer).toHaveBeenCalled();
  });

  it("should resize with same format", () => {
    const toBuffer = jest.fn(() => "resized");
    const toFormat = jest.fn(() => ({ toBuffer }));
    const resize = jest.fn(() => ({ toBuffer }));
    sharp.mockImplementation(() => ({ resize }));

    convert({
      data: "some data",
      options: {
        w: 400,
        h: 300,
      },
    });

    expect(sharp).toHaveBeenCalled();
    expect(resize).toHaveBeenCalled();
    expect(resize).toBeCalledWith(400, 300);
    expect(toFormat).not.toHaveBeenCalled();
    expect(toBuffer).toHaveBeenCalled();
  });
});
