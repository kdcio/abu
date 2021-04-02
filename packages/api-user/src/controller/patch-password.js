const makePatchPassword = ({ password, parser, response }) => {
  const patchPassword = async ({ event }) => {
    const request = parser(event);

    const id = request?.authorizer?.claims?.sub;
    if (!id) {
      throw new Error("Unauthorized");
    }

    let username = null;
    if (request?.params?.id) {
      username = request.params.id;
    } else {
      throw new Error("Missing username");
    }

    const groups = request?.authorizer?.claims?.["cognito:groups"];
    if (!groups || (groups.indexOf("admin") < 0 && id !== username)) {
      throw new Error("Forbidden: only admins or self can perform this action");
    }

    await password({ ...request.body, username });
    return response.NO_CONTENT();
  };
  return patchPassword;
};

export default makePatchPassword;
