import parser from "@kdcio/api-gw-req";
import response from "@kdcio/api-gw-resp";
import debug from "debug";
import changePassword from "cognito/lib/changePassword";
import makePatchPassword from "./controller/patch-password";
import makePassword from "./use-cases/password";

export const handler = async (event) => {
  debug("lambda:event")(JSON.stringify(event));
  try {
    const password = makePassword({ changePassword });
    const patchPassword = makePatchPassword({ password, parser, response });
    const res = await patchPassword({ event });
    return res;
  } catch (error) {
    debug("lambda:error")(error.message);
    return response.ERROR({ message: error.message });
  }
};
