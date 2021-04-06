const makeHttpDelete = ({ dbDelete, parser, response }) => {
  const httpDelete = async ({ event }) => {
    const request = parser(event);

    // At this point, the lambda authorizer have checked
    // the API key and have given the user authority to
    // perform this action including the validity of the
    // model id. authorizer should contain info about model.

    const { modelId, id } = request.params;
    await dbDelete({ modelId, id });
    return response.NO_CONTENT();
  };
  return httpDelete;
};

export default makeHttpDelete;
