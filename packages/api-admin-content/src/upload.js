import parser from "@kdcio/api-gw-req";
import response from "@kdcio/api-gw-resp";
import debug from "debug";
import makeSignedUrl from "./use-cases/signed-url";
import makeUpload from "./controller/upload";
import getSignedUrl from "./s3/upload";

export const handler = async (event) => {
  debug("lambda:event")(JSON.stringify(event));
  try {
    const signedUrl = makeSignedUrl({ getSignedUrl });
    const upload = makeUpload({ signedUrl, parser, response });
    const res = await upload({ event });
    return res;
  } catch (error) {
    debug("lambda:error")(error);
    return response.ERROR({ message: error.message });
  }
};
