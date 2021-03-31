const makeGetUser = ({ read, parser, response }) => {
  const getUser = async ({ event }) => {
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

    const data = await read({ username });

    return response.OK({ body: data });
  };
  return getUser;
};

export default makeGetUser;
