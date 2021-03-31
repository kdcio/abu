const makeGetBusiness = ({ read, parser, response }) => {
  const getBusiness = async ({ event }) => {
    const request = parser(event);

    let user = null;
    if (request?.authorizer?.claims?.sub) {
      user = request.authorizer.claims;
    } else {
      throw new Error("Unauthorized");
    }

    // TODO: only admin or self can do this

    const data = await read(request.body);

    return response.OK({ body: data });
  };
  return getBusiness;
};

export default makeGetBusiness;
