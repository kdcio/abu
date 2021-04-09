import makeS3 from "../../src/s3/s3";

describe("Make", () => {
  beforeAll(async () => {
    process.env.IS_OFFLINE = "false";
  });

  it("should make s3", async () => {
    const s3 = makeS3();
    expect(s3.config.region).toBe("us-east-1");
    expect(s3.config.signatureVersion).toBe("v4");
  });
});
