import parseQs from "../../src/lib/parse-qs";

describe("Parse query string", () => {
  it.each([
    ["", {}],
    ["w=400", { w: 400 }],
    ["h=300", { h: 300 }],
    ["q=90", { q: 90 }],
    ["f=jpg", { f: "jpg" }],
    ["j=peg", {}],
    ["w=400&h=300", { w: 400, h: 300 }],
    ["w=400&h=300&q=90", { w: 400, h: 300, q: 90 }],
    ["w=400&h=300&q=90&f=jpg", { w: 400, h: 300, q: 90, f: "jpg" }],
    ["w=400&h=300&q=90&f=jpg&j=peg", { w: 400, h: 300, q: 90, f: "jpg" }],
  ])("Test %#", (input, expected) => {
    expect(parseQs(input)).toEqual(expected);
  });
});
