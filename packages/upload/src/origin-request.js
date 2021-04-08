// import get from "./s3/get";

export const handler = (event, context, callback) => {
  const request = { ...event.Records[0].cf.request };

  console.log(JSON.stringify(request));

  // const data = await get({ Key: receivedKey });

  callback(null, request);
};
