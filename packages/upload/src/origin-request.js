import get from "./s3/get";
import parseQs from "./lib/parse-qs";
import createNewKey from "./lib/new-key";

import { INPUT_TYPES } from "./constants";

export const handler = async (event) => {
  console.log(JSON.stringify(event));
  const request = { ...event.Records[0].cf.request };

  console.log(JSON.stringify(request));
  const receivedKey = request.uri.replace("/", "");

  if (receivedKey === "") {
    console.log("No file to process");
    return request;
  }

  if (request.querystring === "") {
    console.log("No resize paramters");
    return request;
  }

  const qs = parseQs(request.querystring);

  const newKey = createNewKey({ key: receivedKey, qs });

  // Get s3 object

  let data;
  try {
    data = await get({ Key: receivedKey });
  } catch (error) {
    // File does not exist
    console.log(error);
    return request;
  }

  if (!data) {
    console.log("Object not found");
    return request;
  }

  if (INPUT_TYPES.indexOf(data.ContentType) < 0) {
    console.log(`Image not supported ${receivedKey} ${data.ContentType}`);
    return request;
  }

  return request;
};
