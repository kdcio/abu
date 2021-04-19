const makePost = ({ seed, parser, response }) => {
  const post = async ({ event }) => {
    const request = parser(event);

    if (!request?.authorizer?.claims?.sub) {
      throw new Error("Unauthorized");
    }

    const groups = request?.authorizer?.claims?.["cognito:groups"];
    if (!groups || groups.indexOf("admin") < 0) {
      throw new Error("Forbidden: only admins can perform this action");
    }

    await seed();
    return response.CREATED();
  };
  return post;
};

export default makePost;
