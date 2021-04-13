import head from "../src/s3/head";
import get from "../src/s3/get";
import put from "../src/s3/put";
import convert from "../src/lib/convert";
import { handler } from "../src/origin-request";
import resizeEvent from "./fixtures/resize.json";
import emptyEvent from "./fixtures/empty.json";

jest.mock("../src/s3/head");
jest.mock("../src/s3/get");
jest.mock("../src/s3/put");
jest.mock("../src/lib/convert");

describe("Origin request", () => {
  beforeEach(() => {
    head.mockReset();
    get.mockReset();
    put.mockReset();
    convert.mockReset();
  });

  it("should resize", async () => {
    head.mockImplementation(() => Promise.reject(new Error("Not found")));
    get.mockImplementation(() => ({ ContentType: "image/jpeg" }));
    const event = JSON.parse(JSON.stringify(resizeEvent));
    const response = await handler(event);
    expect(head).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledTimes(1);
    expect(convert).toHaveBeenCalledTimes(1);
    expect(put).toHaveBeenCalledTimes(1);
    expect(response.uri).toBe("/test-w100-h200.jpg");
  });

  it("should not process for root", async () => {
    const event = JSON.parse(JSON.stringify(emptyEvent));
    const response = await handler(event);
    expect(head).not.toHaveBeenCalled();
    expect(get).not.toHaveBeenCalled();
    expect(convert).not.toHaveBeenCalled();
    expect(put).not.toHaveBeenCalled();
    expect(response.uri).toBe("/");
  });

  it("should not process for empty query string", async () => {
    const event = JSON.parse(JSON.stringify(resizeEvent));
    event.Records[0].cf.request.querystring = "";
    const response = await handler(event);
    expect(head).not.toHaveBeenCalled();
    expect(get).not.toHaveBeenCalled();
    expect(convert).not.toHaveBeenCalled();
    expect(put).not.toHaveBeenCalled();
    expect(response.uri).toBe("/test.jpg");
  });

  it("should not process for invalid query string", async () => {
    const event = JSON.parse(JSON.stringify(resizeEvent));
    event.Records[0].cf.request.querystring = "x=100&y=200";
    const response = await handler(event);
    expect(head).not.toHaveBeenCalled();
    expect(get).not.toHaveBeenCalled();
    expect(convert).not.toHaveBeenCalled();
    expect(put).not.toHaveBeenCalled();
    expect(response.uri).toBe("/test.jpg");
  });

  it("should not process if bucket name does not exist", async () => {
    const event = JSON.parse(JSON.stringify(resizeEvent));
    event.Records[0].cf.request.origin.custom = {};
    const response = await handler(event);
    expect(head).not.toHaveBeenCalled();
    expect(get).not.toHaveBeenCalled();
    expect(convert).not.toHaveBeenCalled();
    expect(put).not.toHaveBeenCalled();
    expect(response.uri).toBe("/test.jpg");
  });

  it("should return existing converted file", async () => {
    const event = JSON.parse(JSON.stringify(resizeEvent));
    head.mockImplementation(() => Promise.resolve());
    const response = await handler(event);
    expect(head).toHaveBeenCalled();
    expect(get).not.toHaveBeenCalled();
    expect(convert).not.toHaveBeenCalled();
    expect(put).not.toHaveBeenCalled();
    expect(response.uri).toBe("/test-w100-h200.jpg");
  });

  it("should not process if original file does not exist", async () => {
    const event = JSON.parse(JSON.stringify(resizeEvent));
    head.mockImplementation(() => Promise.reject(new Error("Not found")));
    get.mockImplementation(() => Promise.reject(new Error("Not found")));
    const response = await handler(event);
    expect(head).toHaveBeenCalled();
    expect(get).toHaveBeenCalled();
    expect(convert).not.toHaveBeenCalled();
    expect(put).not.toHaveBeenCalled();
    expect(response.uri).toBe("/test.jpg");
  });

  it("should not process if original file type is not supported", async () => {
    const event = JSON.parse(JSON.stringify(resizeEvent));
    head.mockImplementation(() => Promise.reject(new Error("Not found")));
    get.mockImplementation(() => Promise.resolve({ ContentType: "image/bmp" }));
    const response = await handler(event);
    expect(head).toHaveBeenCalled();
    expect(get).toHaveBeenCalled();
    expect(convert).not.toHaveBeenCalled();
    expect(put).not.toHaveBeenCalled();
    expect(response.uri).toBe("/test.jpg");
  });

  it("should not process if there's a problem with convertion", async () => {
    const event = JSON.parse(JSON.stringify(resizeEvent));
    head.mockImplementation(() => Promise.reject(new Error("Not found")));
    get.mockImplementation(() =>
      Promise.resolve({ ContentType: "image/jpeg" })
    );
    convert.mockImplementation(() =>
      Promise.reject(new Error("Convert error"))
    );
    const response = await handler(event);
    expect(head).toHaveBeenCalled();
    expect(get).toHaveBeenCalled();
    expect(convert).toHaveBeenCalled();
    expect(put).not.toHaveBeenCalled();
    expect(response.uri).toBe("/test.jpg");
  });
});
