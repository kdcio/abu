import parser from "@kdcio/api-gw-req";
import response from "@kdcio/api-gw-resp";
import debug from "debug";
import removeUser from "cognito/lib/remove";
import makeDeleteUser from "./controller/delete-user";
import makeRemove from "./use-cases/remove";

export const handler = async (event) => {
  debug("lambda:event")(JSON.stringify(event));
  try {
    const remove = makeRemove({ removeUser });
    const deleteUser = makeDeleteUser({ remove, parser, response });
    const res = await deleteUser({ event });
    return res;
  } catch (error) {
    debug("lambda:error")(error.message);
    return response.ERROR({ message: error.message });
  }
};
