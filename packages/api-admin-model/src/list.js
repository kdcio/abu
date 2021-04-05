import parser from "@kdcio/api-gw-req";
import response from "@kdcio/api-gw-resp";
import debug from "debug";
import model from "model/lib/entities/Model";
import makeListModels from "./controller/list-models";
import makeList from "./use-cases/list";

export const handler = async (event) => {
  debug("lambda:event")(JSON.stringify(event));
  try {
    const list = makeList({ model });
    const listModel = makeListModels({ list, parser, response });
    const res = await listModel({ event });
    return res;
  } catch (error) {
    debug("lambda:error")(error.message);
    return response.ERROR({ message: error.message });
  }
};
