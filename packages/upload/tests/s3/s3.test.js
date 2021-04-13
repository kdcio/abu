import makeS3 from "../../src/s3/s3";

describe("Make", () => {
  it("should make s3", async () => {
    process.env.IS_OFFLINE = "false";
    const s3 = makeS3();
    expect(s3.config.region).toBe("us-east-1");
    expect(s3.config.signatureVersion).toBe("v4");
  });
});
