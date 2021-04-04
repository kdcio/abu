import makeS3 from "./s3";

const get = async ({ Key }) => {
  const { S3_BUCKET } = process.env;
  const params = {
    Bucket: S3_BUCKET,
    Key,
  };

  const s3 = makeS3();
  return s3.getObject(params).promise();
};

export default get;
