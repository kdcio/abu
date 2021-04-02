const makePatchModel = ({ patch, parser, response }) => {
  const patchModel = async ({ event }) => {
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

    await patch({ ...request.body, id });
    return response.NO_CONTENT();
  };
  return patchModel;
};

export default makePatchModel;
