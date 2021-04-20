const makeBrowse = ({ list, listAll, parser, response }) => {
  const browse = async ({ event }) => {
    const request = parser(event);

    // At this point, the lambda authorizer have checked
    // the API key and have given the user authority to
    // perform this action including the validity of the
    // model id. authorizer should contain info about model.
    // TODO: This endpoint should not be available for
    // non - collections.

    const { modelId } = request.params;
    const { query } = request;
    const { limit, cursor, all, fields, lastModified } = query;

    const data = all
      ? await listAll({ modelId, lastModified, fields })
      : await list({ modelId, limit, cursor });
    return response.OK({ body: data });
  };
  return browse;
};

export default makeBrowse;
