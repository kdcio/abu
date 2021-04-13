import makeS3 from "../../src/s3/s3";
import put from "../../src/s3/put";

jest.mock("../../src/s3/s3");

describe("S3 Put", () => {
  beforeAll(() => {
    makeS3.mockClear();
  });

  it("should get s3", async () => {
    const promise = jest.fn(() => Promise.resolve());
    const putObject = jest.fn(() => ({ promise }));
    makeS3.mockImplementation(() => ({ putObject }));
    await put({ Bucket: "my-bucket", Key: "test.jpg", data: "some data" });
    expect(makeS3).toBeCalledTimes(1);
    expect(putObject).toBeCalledTimes(1);
    expect(promise).toBeCalledTimes(1);
    expect(putObject).toBeCalledWith({
      Bucket: "my-bucket",
      CacheControl: "public,max-age=31536000",
      Key: "test.jpg",
      Body: "some data",
    });
  });
});
