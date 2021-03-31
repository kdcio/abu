const makeGetUser = ({ read, parser, response }) => {
  const getUser = async ({ event }) => {
    const request = parser(event);

    if (!request?.authorizer?.claims?.sub) {
      throw new Error("Unauthorized");
    }

    // TODO: only admin or self can do this

    let username = null;
    if (request?.params?.id) {
      username = request.params.id;
    } else {
      throw new Error("Missing username");
    }

    const data = await read({ username });

    return response.OK({ body: data });
  };
  return getUser;
};

export default makeGetUser;
