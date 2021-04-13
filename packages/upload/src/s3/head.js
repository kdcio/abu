import makeS3 from "./s3";

const head = async ({ Bucket, Key }) => {
  const params = { Bucket, Key };
  const s3 = makeS3();
  return s3.headObject(params).promise();
};

export default head;
