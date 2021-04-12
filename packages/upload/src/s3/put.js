import makeS3 from "./s3";

const put = async ({ Key, data }) => {
  const params = {
    Bucket: "admin-github-upload.abucms.com",
    Key,
    CacheControl: "public,max-age=31536000",
    Body: data,
  };

  const s3 = makeS3();
  return s3.putObject(params).promise();
};

export default put;
