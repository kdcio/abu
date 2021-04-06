const makeGetModel = ({ get, parser, response }) => {
  const getModel = async ({ event }) => {
    const request = parser(event);

    if (!request?.authorizer?.claims?.sub) {
      throw new Error("Unauthorized");
    }

    let id = null;
    if (request?.params?.id) {
      id = request.params.id;
    } else {
      throw new Error("Missing id");
    }

    const data = await get({ id });
    return response.OK({ body: data });
  };
  return getModel;
};

export default makeGetModel;
