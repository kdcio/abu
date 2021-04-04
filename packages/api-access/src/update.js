import parser from "@kdcio/api-gw-req";
import response from "@kdcio/api-gw-resp";
import debug from "debug";
import model from "model/lib/entities/Content";
import makePatchModel from "./controller/patch";
import makeUpdate from "./use-cases/update";

export const handler = async (event) => {
  debug("lambda:event")(JSON.stringify(event));
  try {
    const update = makeUpdate({ model });
    const patchModel = makePatchModel({ update, parser, response });
    const res = await patchModel({ event });
    return res;
  } catch (error) {
    debug("lambda:error")(error.message);
    return response.ERROR({ message: error.message });
  }
};
