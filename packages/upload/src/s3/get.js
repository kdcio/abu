import makeS3 from "./s3";

const get = async ({ Bucket, Key }) => {
  const params = { Bucket, Key };
  const s3 = makeS3();
  return s3.getObject(params).promise();
};

export default get;
