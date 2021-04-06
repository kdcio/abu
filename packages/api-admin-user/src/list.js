import parser from "@kdcio/api-gw-req";
import response from "@kdcio/api-gw-resp";
import debug from "debug";
import listUsers from "cognito/lib/list";
import makeGetUsers from "./controller/get-users";
import makeList from "./use-cases/list";

export const handler = async (event) => {
  debug("lambda:event")(JSON.stringify(event));
  try {
    const list = makeList({ listUsers });
    const getUsers = makeGetUsers({ list, parser, response });
    const res = await getUsers({ event });
    return res;
  } catch (error) {
    debug("lambda:error")(error.message);
    return response.ERROR({ message: error.message });
  }
};
