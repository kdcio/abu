import parser from "@kdcio/api-gw-req";
import response from "@kdcio/api-gw-resp";
import debug from "debug";
import { v4 as uuid } from "uuid";
import model from "model/lib/entities/ApiAccess";
import makePost from "./controller/post";
import makeCreate from "./use-cases/create";

export const handler = async (event) => {
  debug("lambda:event")(JSON.stringify(event));
  try {
    const create = makeCreate({ model, uuid });
    const post = makePost({ create, parser, response });
    const res = await post({ event });
    return res;
  } catch (error) {
    debug("lambda:error")(error.message);
    return response.ERROR({ message: error.message });
  }
};
