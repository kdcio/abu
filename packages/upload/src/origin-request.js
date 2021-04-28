import head from "./s3/head";
import get from "./s3/get";
import put from "./s3/put";
import parseQs from "./lib/parse-qs";
import createNewKey from "./lib/new-key";
import convert from "./lib/convert";

import { INPUT_TYPES } from "./constants";

export const handler = async (event) => {
  // console.log(JSON.stringify(event));
  const request = { ...event.Records[0].cf.request };

  // console.log(JSON.stringify(request));
  const receivedKey = decodeURI(request.uri.replace("/", "")); // remove first '/'

  if (receivedKey === "") {
    console.log("No file to process");
    return request;
  }

  if (request.querystring === "") {
    console.log("No resize paramters");
    return request;
  }

  const qs = parseQs(request.querystring);
  if (Object.keys(qs).length === 0) {
    console.log("Invalid resize paramters");
    return request;
  }

  let Bucket;
  try {
    Bucket = request.origin.custom.customHeaders["x-bucket-name"][0].value;
  } catch (error) {
    // console.log(error);
  }

  if (!Bucket) {
    console.log("Bucket name not found");
    return request;
  }

  const newKey = createNewKey({ key: receivedKey, qs });
  console.log(receivedKey, newKey);
  try {
    await head({ Bucket, Key: newKey });
    // file already converted
    console.log("Converted file exist");
    request.uri = `/${encodeURI(newKey)}`;
    return request;
  } catch (error) {
    // need to convert, continue
    console.log("Converted file does NOT exist");
  }

  // Get s3 object
  let data;
  try {
    data = await get({ Bucket, Key: receivedKey });
  } catch (error) {
    // File does not exist
    console.log("Original file does NOT exist");
    // console.log(error);
    return request;
  }

  if (INPUT_TYPES.indexOf(data.ContentType) < 0) {
    console.log(`Image not supported ${receivedKey} ${data.ContentType}`);
    return request;
  }

  try {
    const resized = await convert({ data: data.Body, options: qs });
    await put({ Bucket, Key: newKey, data: resized });
  } catch (error) {
    console.log("Error converting");
    console.log(error);
    console.log(qs, newKey);
    console.log(data);
    return request;
  }

  request.uri = `/${encodeURI(newKey)}`;
  console.log(`New uri: ${request.uri}`);
  return request;
};
