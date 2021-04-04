import makeS3 from "./s3";
import path from "path";

const generateKey = (timestamp, source) => {
  const { S3_BUCKET_PREFIX } = process.env;
  const filename = source.replace(/[^a-z0-9.-]/gi, "_").toLowerCase();
  return `${S3_BUCKET_PREFIX}/${timestamp}-${filename}`;
};

const getSignedUrl = async ({ filename, type }) => {
  const { S3_BUCKET } = process.env;
  const timestamp = +new Date();
  const file = path.parse(filename);

  const targets = {
    thumb: `thumb/${timestamp}-${file.name}.webp`,
    medium: `medium/${timestamp}-${file.name}.webp`,
    large: `large/${timestamp}-${file.name}.webp`,
  };

  const Metadata = {
    "opt-thumb": JSON.stringify({
      width: 200,
      format: "webp",
      target: targets.thumb,
    }),
    "opt-medium": JSON.stringify({
      width: 500,
      format: "webp",
      target: targets.medium,
    }),
    "opt-large": JSON.stringify({
      width: 1080,
      format: "webp",
      target: targets.large,
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
    targets,
  };
};

export default getSignedUrl;
