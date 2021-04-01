import parser from "@kdcio/api-gw-req";
import response from "@kdcio/api-gw-resp";
import debug from "debug";
import updateUser from "cognito/lib/updateAttributes";
import setGroup from "cognito/lib/setGroup";
import makePatchUser from "./controller/patch-user";
import makePatch from "./use-cases/patch";

export const handler = async (event) => {
  debug("lambda:event")(JSON.stringify(event));
  try {
    const patch = makePatch({ updateUser, setGroup });
    const patchUser = makePatchUser({ patch, parser, response });
    const res = await patchUser({ event });
    return res;
  } catch (error) {
    debug("lambda:error")(error.message);
    return response.ERROR({ message: error.message });
  }
};
