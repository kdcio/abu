import createNewKey from "../../src/lib/new-key";

describe("Create new key", () => {
  it.each([
    [{ w: 400 }, "test.jpg", "test-w400.jpg"],
    [{ w: 400 }, "uploads/test.jpg", "uploads/test-w400.jpg"],
    [{ h: 300 }, "uploads/test.jpg", "uploads/test-h300.jpg"],
    [{ q: 75 }, "uploads/test.jpg", "uploads/test-q75.jpg"],
    [{ q: 75 }, "uploads/test.jpeg", "uploads/test-q75.jpg"],
    [{ w: 400, h: 300 }, "uploads/test.jpg", "uploads/test-w400-h300.jpg"],
    [
      { w: 400, h: 300, q: 90 },
      "uploads/test.jpg",
      "uploads/test-w400-h300-q90.jpg",
    ],
    [
      {
        w: 400,
        h: 300,
        q: 90,
        f: "webp",
      },
      "uploads/test.jpg",
      "uploads/test-w400-h300.webp",
    ],
    [
      {
        w: 400,
        h: 300,
        f: "png",
      },
      "uploads/test.jpg",
      "uploads/test-w400-h300.png",
    ],
    [
      {
        w: 400,
        h: 300,
        q: 90,
        f: "jpg",
      },
      "uploads/test.png",
      "uploads/test-w400-h300-q90.jpg",
    ],
    [
      {
        w: 400,
        h: 300,
        q: 90,
        f: "jpeg",
      },
      "uploads/test.png",
      "uploads/test-w400-h300-q90.jpg",
    ],
    [
      {
        w: 400,
        h: 300,
        q: 90,
        f: "bmp",
      },
      "uploads/test.png",
      "uploads/test.png",
    ],
    [
      {
        w: 400,
        h: 300,
        q: 90,
      },
      "uploads/test.png",
      "uploads/test-w400-h300.png",
    ],
  ])("Test %#", (qs, key, expected) => {
    expect(createNewKey({ qs, key })).toEqual(expected);
  });
});
