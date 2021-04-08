import S3 from "aws-sdk/clients/s3";

const makeS3 = () => {
  const { REGION } = process.env;
  return new S3({ signatureVersion: "v4", region: REGION });
};

export default makeS3;
