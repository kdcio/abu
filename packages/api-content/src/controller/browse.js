const makeBrowse = ({ list, listAll, parser, response }) => {
  const browse = async ({ event }) => {
    const request = parser(event);

    // At this point, the lambda authorizer have checked
    // the API key and have given the user authority to
    // perform this action including the validity of the
    // model id

    const { modelId } = request.params;
    const { query } = request;
    const { limit, cursor, all } = query;

    const data = all
      ? await listAll({ modelId })
      : await list({ modelId, limit, cursor });
    return response.OK({ body: data });
  };
  return browse;
};

export default makeBrowse;
