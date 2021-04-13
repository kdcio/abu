import makeS3 from "./s3";

const generateKey = (source) => {
  const d = new Date();
  const yr = d.getFullYear();
  const mn = String(d.getMonth() + 1).padStart(2, 0);
  const dy = String(d.getDate()).padStart(2, 0);
  const filename = source.replace(/[^a-z0-9.-]/gi, "_").toLowerCase();

  return `${yr}/${mn}/${dy}/${d.valueOf()}-${filename}`;
};

const getSignedUrl = async ({ filename, type }) => {
  const { S3_BUCKET, S3_BASE_URL } = process.env;

  const params = {
    Bucket: S3_BUCKET,
    Key: generateKey(filename),
    ContentType: type,
    Expires: 600,
    ACL: "public-read",
    CacheControl: "public,max-age=31536000",
  };

  const s3 = makeS3();
  const url = await s3.getSignedUrl("putObject", params);
  return {
    url,
    target: `${S3_BASE_URL}/${params.Key}`,
  };
};

export default getSignedUrl;
