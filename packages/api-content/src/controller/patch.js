const makePatch = ({ update, parser, response }) => {
  const patch = async ({ event }) => {
    const request = parser(event);

    // At this point, the lambda authorizer have checked
    // the API key and have given the user authority to
    // perform this action including the validity of the
    // model id

    const { modelId, id } = request.params;
    await update({ data: request.body, id, modelId });
    return response.NO_CONTENT();
  };
  return patch;
};

export default makePatch;
