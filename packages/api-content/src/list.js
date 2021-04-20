import parser from "@kdcio/api-gw-req";
import response from "@kdcio/api-gw-resp";
import debug from "debug";
import model from "model/lib/entities/Content";
import modelModel from "model/lib/entities/Model";
import makeBrowse from "./controller/browse";
import makeList from "./use-cases/list";
import makeListAll from "./use-cases/list-all";
import encrypt from "./lib/encrypt";
import decrypt from "./lib/decrypt";

export const handler = async (event) => {
  debug("lambda:event")(JSON.stringify(event));
  try {
    const list = makeList({ model, encrypt, decrypt });
    const listAll = makeListAll({ model, modelModel });
    const browse = makeBrowse({ list, listAll, parser, response });
    const res = await browse({ event });
    return res;
  } catch (error) {
    debug("lambda:error")(error.message);
    return response.ERROR({ message: error.message });
  }
};
