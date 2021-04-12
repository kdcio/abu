import makeS3 from "./s3";

const get = async ({ Key }) => {
  const params = {
    Bucket: "admin-github-upload.abucms.com",
    Key,
  };

  const s3 = makeS3();
  return s3.getObject(params).promise();
};

export default get;
