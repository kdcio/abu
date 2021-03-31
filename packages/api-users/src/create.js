import parser from "@kdcio/api-gw-req";
import response from "@kdcio/api-gw-resp";
import debug from "debug";
import createUser from "cognito/lib/create";
import makePostUser from "./controller/post-user";
import makeCreate from "./use-cases/create";

export const handler = async (event) => {
  debug("lambda:event")(JSON.stringify(event));
  try {
    const create = makeCreate({ createUser });
    const postUser = makePostUser({ create, parser, response });
    const res = await postUser({ event });
    return res;
  } catch (error) {
    debug("lambda:error")(error.message);
    return response.ERROR({ message: error.message });
  }
};
