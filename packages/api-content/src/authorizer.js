import authorizer from "authorizer";
import Debug from "debug";

const debug = Debug("lambda:auth");

export const handler = async (event) => {
  debug(JSON.stringify(event));

  /**
   * Format: {httpVerb}/[{resource}/[{child-resources}]]
   */
  const resources = {
    admin: ["GET/"],
    editor: ["GET/"],
  };

  try {
    const { authorizationToken: token, methodArn } = event;
    if (!token) throw new Error("Unauthorized");
    const policy = await authorizer({ token, methodArn, resources });
    debug(JSON.stringify(policy, null, 2));
    return policy;
  } catch (error) {
    debug(error);
    return null;
  }
};
