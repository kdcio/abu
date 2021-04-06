const makeGet = ({ read, parser, response }) => {
  const get = async ({ event }) => {
    const request = parser(event);

    if (!request?.authorizer?.claims?.sub) {
      throw new Error("Unauthorized");
    }

    const groups = request?.authorizer?.claims?.["cognito:groups"];
    if (!groups || groups.indexOf("admin") < 0) {
      throw new Error("Forbidden: only admins can perform this action");
    }

    let id = null;
    if (request?.params?.id) {
      id = request.params.id;
    } else {
      throw new Error("Missing id");
    }

    const data = await read({ id });
    return response.OK({ body: data });
  };
  return get;
};

export default makeGet;
