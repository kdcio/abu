import debug from "debug";
import get from "./s3/get";
import resize from "./lib/process";

const CONTENT_TYPES = ["image/gif", "image/jpeg", "image/png", "image/webp"];

const processObject = async (rec) => {
  const receivedKey = rec.s3.object.key;

  try {
    const proms = [];
    const data = await get({ Key: receivedKey });
    if (!CONTENT_TYPES.indexOf(data.ContentType)) {
      debug("resize:info")(
        `Image not supported ${receivedKey} ${data.ContentType}`
      );
      return;
    }

    Object.keys(data.Metadata).forEach((key) => {
      if (!key.match(/^opt-(.*)/)) return;
      const options = JSON.parse(data.Metadata[key]);
      proms.push(resize({ data, options }));
    });
    await Promise.all(proms);
  } catch (error) {
    console.error(error);
    debug("lambda:error")(JSON.stringify(error));
  }
};

export const handler = async (event) => {
  debug("lambda:event")(JSON.stringify(event));

  try {
    const proms = [];
    event.Records.forEach((rec) => proms.push(processObject(rec)));
    await Promise.all(proms);
  } catch (error) {
    console.log(error);
    debug("lambda:error")(JSON.stringify(error));
  }
};
