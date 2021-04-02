const makeListModel = ({ list, parser, response }) => {
  const listModel = async ({ event }) => {
    const request = parser(event);

    if (!request?.authorizer?.claims?.sub) {
      throw new Error("Unauthorized");
    }

    const data = await list();
    return response.OK({ body: data });
  };
  return listModel;
};

export default makeListModel;
