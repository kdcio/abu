import parser from "@kdcio/api-gw-req";
import response from "@kdcio/api-gw-resp";
import debug from "debug";
import model from "model/lib/entities/Model";
import makeHttpDelete from "./controller/delete";
import makeDBDelete from "./use-cases/delete";

export const handler = async (event) => {
  debug("lambda:event")(JSON.stringify(event));
  try {
    const dbDelete = makeDBDelete({ model });
    const httpDelete = makeHttpDelete({ dbDelete, parser, response });
    const res = await httpDelete({ event });
    return res;
  } catch (error) {
    debug("lambda:error")(error.message);
    return response.ERROR({ message: error.message });
  }
};
