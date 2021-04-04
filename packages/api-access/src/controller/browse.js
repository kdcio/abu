const makeBrowse = ({ list, parser, response }) => {
  const browse = async ({ event }) => {
    const request = parser(event);

    if (!request?.authorizer?.claims?.sub) {
      throw new Error("Unauthorized");
    }

    const groups = request?.authorizer?.claims?.["cognito:groups"];
    if (!groups || groups.indexOf("admin") < 0) {
      throw new Error("Forbidden: only admins can perform this action");
    }

    const data = await list();
    return response.OK({ body: data });
  };
  return browse;
};

export default makeBrowse;
