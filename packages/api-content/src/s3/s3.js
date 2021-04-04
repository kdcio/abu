import S3 from "aws-sdk/clients/s3";
import AWS from "aws-sdk/global";

const makeS3 = () => {
  const { IS_OFFLINE, REGION } = process.env;
  if (IS_OFFLINE === "true") {
    return new S3({
      signatureVersion: "v4",
      region: REGION,
      s3ForcePathStyle: true,
      accessKeyId: "S3RVER", // This specific key is required when working offline
      secretAccessKey: "S3RVER",
      endpoint: new AWS.Endpoint("http://localhost:8064"),
    });
  }
  return new S3({ signatureVersion: "v4", region: REGION });
};

export default makeS3;
