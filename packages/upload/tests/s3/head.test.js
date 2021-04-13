import makeS3 from "../../src/s3/s3";
import head from "../../src/s3/head";

jest.mock("../../src/s3/s3");

describe("S3 Head", () => {
  it("should get head", async () => {
    const promise = jest.fn(() => Promise.resolve());
    const headObject = jest.fn(() => ({ promise }));
    makeS3.mockImplementation(() => ({ headObject }));
    await head({ Bucket: "my-bucket", Key: "test.jpg" });
    expect(makeS3).toBeCalledTimes(1);
    expect(headObject).toBeCalledTimes(1);
    expect(promise).toBeCalledTimes(1);
    expect(headObject).toBeCalledWith({
      Bucket: "my-bucket",
      Key: "test.jpg",
    });
  });
});
