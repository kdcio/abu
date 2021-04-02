import parser from "@kdcio/api-gw-req";
import response from "@kdcio/api-gw-resp";
import debug from "debug";
import model from "model/lib/entities/Model";
import makeRemoveModel from "./controller/remove-model";
import makeRemove from "./use-cases/remove";

export const handler = async (event) => {
  debug("lambda:event")(JSON.stringify(event));
  try {
    const remove = makeRemove({ model });
    const removeModel = makeRemoveModel({ remove, parser, response });
    const res = await removeModel({ event });
    return res;
  } catch (error) {
    debug("lambda:error")(error.message);
    return response.ERROR({ message: error.message });
  }
};
