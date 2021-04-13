import makeS3 from "../../src/s3/s3";
import get from "../../src/s3/get";

jest.mock("../../src/s3/s3");

describe("S3 Get", () => {
  it("should get s3", async () => {
    const promise = jest.fn(() => Promise.resolve());
    const getObject = jest.fn(() => ({ promise }));
    makeS3.mockImplementation(() => ({ getObject }));
    await get({ Bucket: "my-bucket", Key: "test.jpg" });
    expect(makeS3).toBeCalledTimes(1);
    expect(getObject).toBeCalledTimes(1);
    expect(promise).toBeCalledTimes(1);
    expect(getObject).toBeCalledWith({
      Bucket: "my-bucket",
      Key: "test.jpg",
    });
  });
});
