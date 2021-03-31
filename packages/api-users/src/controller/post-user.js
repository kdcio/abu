import debug from "debug";

const makePostUser = ({ create, parser, response }) => {
  const postUser = async ({ event }) => {
    const request = parser(event);
    let user = null;
    if (request?.authorizer?.claims?.sub) {
      user = request.authorizer.claims;
    } else {
      throw new Error("Unauthorized");
    }

    // TODO: check group if admin. return forbidden if not

    await create(request.body);
    return response.CREATED();
  };
  return postUser;
};

export default makePostUser;
