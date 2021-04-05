const makeUpload = ({ signedUrl, parser, response }) => {
  const upload = async ({ event }) => {
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

    const { query } = request;
    const { filename, type } = query;

    const data = await signedUrl({ modelId, filename, type });
    return response.OK({ body: data });
  };
  return upload;
};

export default makeUpload;
