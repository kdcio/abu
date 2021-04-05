const makeDeleteUser = ({ remove, parser, response }) => {
  const deleteUser = async ({ event }) => {
    const request = parser(event);

    const id = request?.authorizer?.claims?.sub;
    if (!id) {
      throw new Error("Unauthorized");
    }

    let username = null;
    if (request?.params?.id) {
      username = request.params.id;
    } else {
      throw new Error("Missing username");
    }

    const groups = request?.authorizer?.claims?.["cognito:groups"];
    if (!groups || groups.indexOf("admin") < 0) {
      throw new Error("Forbidden: only admins can perform this action");
    }

    await remove({ username });
    return response.NO_CONTENT();
  };
  return deleteUser;
};

export default makeDeleteUser;
