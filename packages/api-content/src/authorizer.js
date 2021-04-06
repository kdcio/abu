import authorizer from "authorizer";
import Debug from "debug";

const debug = Debug("lambda:auth");

export const handler = async (event) => {
  debug(event);

  try {
    const { authorizationToken: token, methodArn } = event;
    if (!token) throw new Error("Unauthorized");
    const policy = await authorizer({ token, methodArn });
    debug(JSON.stringify(policy, null, 2));
    return policy;
  } catch (error) {
    debug(error);
    return null;
  }
};
