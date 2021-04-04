import parser from "@kdcio/api-gw-req";
import response from "@kdcio/api-gw-resp";
import debug from "debug";
import model from "model/lib/entities/Content";
import makeGet from "./controller/get";
import makeRead from "./use-cases/read";

export const handler = async (event) => {
  debug("lambda:event")(JSON.stringify(event));
  try {
    const read = makeRead({ model });
    const get = makeGet({ read, parser, response });
    const res = await get({ event });
    return res;
  } catch (error) {
    debug("lambda:error")(error.message);
    return response.ERROR({ message: error.message });
  }
};
