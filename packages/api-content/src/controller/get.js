const makeGet = ({ read, parser, response }) => {
  const get = async ({ event }) => {
    const request = parser(event);

    // At this point, the lambda authorizer have checked
    // the API key and have given the user authority to
    // perform this action

    let modelId = null;
    if (request?.params?.modelId) {
      modelId = request.params.modelId;
    } else {
      throw new Error("Missing model id");
    }

    let id = null;
    if (request?.params?.id) {
      id = request.params.id;
    } else {
      throw new Error("Missing id");
    }

    const data = await read({ modelId, id });
    return response.OK({ body: data });
  };
  return get;
};

export default makeGet;
