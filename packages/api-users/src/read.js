import parser from "@kdcio/api-gw-req";
import response from "@kdcio/api-gw-resp";
import debug from "debug";
import readUser from "cognito/lib/read";
import makeGetUser from "./controller/get-user";
import makeRead from "./use-cases/read";

export const handler = async (event) => {
  debug("lambda:event")(JSON.stringify(event));
  try {
    const read = makeRead({ readUser });
    const getUser = makeGetUser({ read, parser, response });
    const res = await getUser({ event });
    return res;
  } catch (error) {
    debug("lambda:error")(error.message);
    return response.ERROR({ message: error.message });
  }
};
