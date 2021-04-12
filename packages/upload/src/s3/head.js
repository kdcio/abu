import makeS3 from "./s3";

const head = async ({ Key }) => {
  const params = {
    Bucket: "admin-github-upload.abucms.com",
    Key,
  };

  const s3 = makeS3();
  return s3.headObject(params).promise();
};

export default head;
