const makePost = ({ create, parser, response }) => {
  const post = async ({ event }) => {
    const request = parser(event);

    // At this point, the lambda authorizer have checked
    // the API key and have given the user authority to
    // perform this action including the validity of the
    // model id

    const { modelId } = request.params;
    const data = await create({ ...request.body, modelId });
    return response.CREATED({ body: data });
  };
  return post;
};

export default makePost;
