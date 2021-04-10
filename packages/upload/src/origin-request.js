import debug from "debug";
// import get from "./s3/get";

export const handler = (event, context, callback) => {
  debug("lambda:event")(JSON.stringify(event));
  const request = { ...event.Records[0].cf.request };

  debug("lambda:request")(JSON.stringify(request));

  // const data = await get({ Key: receivedKey });

  callback(null, request);
};
