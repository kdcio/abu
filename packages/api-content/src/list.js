import parser from "@kdcio/api-gw-req";
import response from "@kdcio/api-gw-resp";
import debug from "debug";
import model from "model/lib/entities/Content";
import makeBrowse from "./controller/browse";
import makeList from "./use-cases/list";

export const handler = async (event) => {
  debug("lambda:event")(JSON.stringify(event));
  try {
    const list = makeList({ model });
    const browse = makeBrowse({ list, parser, response });
    const res = await browse({ event });
    return res;
  } catch (error) {
    debug("lambda:error")(error.message);
    return response.ERROR({ message: error.message });
  }
};
