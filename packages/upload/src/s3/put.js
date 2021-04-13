import makeS3 from "./s3";

const put = async ({ Bucket, Key, data }) => {
  const params = {
    Bucket,
    Key,
    CacheControl: "public,max-age=31536000",
    Body: data,
  };

  const s3 = makeS3();
  return s3.putObject(params).promise();
};

export default put;
