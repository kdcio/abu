import parser from "@kdcio/api-gw-req";
import response from "@kdcio/api-gw-resp";
import debug from "debug";
import model from "model/lib/entities/Model";
import makePatchModel from "./controller/patch";
import makePatch from "./use-cases/patch";

export const handler = async (event) => {
  debug("lambda:event")(JSON.stringify(event));
  try {
    const patch = makePatch({ model });
    const patchModel = makePatchModel({ patch, parser, response });
    const res = await patchModel({ event });
    return res;
  } catch (error) {
    debug("lambda:error")(error.message);
    return response.ERROR({ message: error.message });
  }
};
