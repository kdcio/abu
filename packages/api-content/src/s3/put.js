import makeS3 from "./s3";

const put = async ({ Key, data }) => {
  const { S3_BUCKET } = process.env;
  const params = {
    Bucket: S3_BUCKET,
    Key,
    CacheControl: "public,max-age=31536000",
    Body: data,
  };

  const s3 = makeS3();
  return s3.putObject(params).promise();
};

export default put;
