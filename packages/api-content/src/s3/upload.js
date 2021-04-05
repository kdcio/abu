import makeS3 from "./s3";
import path from "path";

const generateKey = (timestamp, source) => {
  const { S3_BUCKET_PREFIX } = process.env;
  const filename = source.replace(/[^a-z0-9.-]/gi, "_").toLowerCase();
  return `${S3_BUCKET_PREFIX}/${timestamp}-${filename}`;
};

const getSignedUrl = async ({ filename, type }) => {
  const { S3_BUCKET, S3_BASE_URL } = process.env;
  const timestamp = +new Date();
  const file = path.parse(filename);

  const targets = {
    thumb: `thumb/${timestamp}-${file.name}.webp`,
    orig: `orig/${timestamp}-${file.base}`,
  };

  const Metadata = {
    "opt-thumb": JSON.stringify({
      width: 200,
      format: "webp",
      target: targets.thumb,
    }),
    "opt-orig": JSON.stringify({
      target: targets.orig,
    }),
  };

  const params = {
    Bucket: S3_BUCKET,
    Key: generateKey(timestamp, filename),
    ContentType: type,
    Expires: 600,
    ACL: "public-read",
    Metadata,
  };

  const s3 = makeS3();
  const url = await s3.getSignedUrl("putObject", params);
  return {
    url,
    targets: Object.keys(targets).reduce((acc, k) => {
      console.log(k, targets[k], acc);
      acc[k] = `${S3_BASE_URL}/${targets[k]}`;
      return acc;
    }, {}),
  };
};

export default getSignedUrl;
