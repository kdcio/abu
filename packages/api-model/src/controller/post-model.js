const makePostModel = ({ create, parser, response }) => {
  const postModel = async ({ event }) => {
    const request = parser(event);

    if (!request?.authorizer?.claims?.sub) {
      throw new Error("Unauthorized");
    }

    const data = await create({ ...request.body });
    return response.CREATED({ body: data });
  };
  return postModel;
};

export default makePostModel;
