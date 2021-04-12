import S3 from "aws-sdk/clients/s3";

const makeS3 = () => {
  return new S3({ signatureVersion: "v4", region: "us-east-1" });
};

export default makeS3;
