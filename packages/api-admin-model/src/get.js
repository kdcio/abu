import parser from "@kdcio/api-gw-req";
import response from "@kdcio/api-gw-resp";
import debug from "debug";
import model from "model/lib/entities/Model";
import makeGetModel from "./controller/get-model";
import makeGet from "./use-cases/get";

export const handler = async (event) => {
  debug("lambda:event")(JSON.stringify(event));
  try {
    const get = makeGet({ model });
    const getModel = makeGetModel({ get, parser, response });
    const res = await getModel({ event });
    return res;
  } catch (error) {
    debug("lambda:error")(error.message);
    return response.ERROR({ message: error.message });
  }
};
