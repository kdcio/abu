const makePatch = ({ update, parser, response }) => {
  const patch = async ({ event }) => {
    const request = parser(event);

    if (!request?.authorizer?.claims?.sub) {
      throw new Error("Unauthorized");
    }

    const allowsGroups = ["admin", "editor"];
    const groups = request?.authorizer?.claims?.["cognito:groups"] || [];
    const filteredGroup = allowsGroups.filter((g) => groups.includes(g));
    if (filteredGroup.length < 0) {
      throw new Error(
        "Forbidden: only admins and editors can perform this action"
      );
    }

    let modelId = null;
    if (request?.params?.modelId) {
      modelId = request.params.modelId;
    } else {
      throw new Error("Missing model id");
    }

    let id = null;
    if (request?.params?.id) {
      id = request.params.id;
    } else {
      throw new Error("Missing id");
    }

    await update({ ...request.body, id, modelId });
    return response.NO_CONTENT();
  };
  return patch;
};

export default makePatch;
