import parser from "@kdcio/api-gw-req";
import response from "@kdcio/api-gw-resp";
import debug from "debug";
import model from "model/lib/entities/Model";
import makePostModel from "./controller/post-model";
import makeCreate from "./use-cases/create";

export const handler = async (event) => {
  debug("lambda:event")(JSON.stringify(event));
  try {
    const create = makeCreate({ model });
    const postModel = makePostModel({ create, parser, response });
    const res = await postModel({ event });
    return res;
  } catch (error) {
    debug("lambda:error")(error.message);
    return response.ERROR({ message: error.message });
  }
};
