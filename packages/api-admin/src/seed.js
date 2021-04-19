import parser from "@kdcio/api-gw-req";
import response from "@kdcio/api-gw-resp";
import debug from "debug";
import { v4 as uuid } from "uuid";
import Model from "model/lib/entities/Model";
import ApiAccess from "model/lib/entities/ApiAccess";
import Content from "model/lib/entities/Content";
import makePost from "./controller/post";
import makeSeed from "./use-cases/seed";

export const handler = async (event) => {
  debug("lambda:event")(JSON.stringify(event));
  try {
    const seed = makeSeed({ Model, ApiAccess, Content, uuid });
    const post = makePost({ seed, parser, response });
    const res = await post({ event });
    return res;
  } catch (error) {
    debug("lambda:error")(error.message);
    return response.ERROR({ message: error.message });
  }
};
