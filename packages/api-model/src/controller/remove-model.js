const makeRemoveModel = ({ remove, parser, response }) => {
  const removeModel = async ({ event }) => {
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

    await remove({ id });
    return response.NO_CONTENT();
  };
  return removeModel;
};

export default makeRemoveModel;
