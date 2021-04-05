const makeGet = ({ read, parser, response }) => {
  const get = async ({ event }) => {
    const request = parser(event);

    // At this point, the lambda authorizer have checked
    // the API key and have given the user authority to
    // perform this action including the validity of the
    // model id. authorizer should contain info about model.

    const { modelId, id } = request.params;
    const data = await read({ modelId, id });
    return response.OK({ body: data });
  };
  return get;
};

export default makeGet;
