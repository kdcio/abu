const makeGetUsers = ({ list, parser, response }) => {
  const getUsers = async ({ event }) => {
    const request = parser(event);

    const id = request?.authorizer?.claims?.sub;
    if (!id) {
      throw new Error("Unauthorized");
    }

    const groups = request?.authorizer?.claims?.["cognito:groups"];
    if (!groups || groups.indexOf("admin") < 0) {
      throw new Error("Forbidden: only admins can perform this action");
    }

    const data = await list();
    return response.OK({ body: data });
  };
  return getUsers;
};

export default makeGetUsers;
