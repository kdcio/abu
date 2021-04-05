const makeList = ({ model }) => {
  const list = async ({ modelId, lastKey, limit = 10 }) => {
    const params = { index: "GSI", reverse: true, limit: parseInt(limit, 10) };
    if (lastKey) params.startKey = JSON.parse(lastKey);
    const { Items, LastEvaluatedKey } = await model.query(
      `MOD#${modelId}#CON`,
      params
    );
    return {
      lastKey: LastEvaluatedKey,
      Items: Items.map(({ id, created, modified, data }) => ({
        id,
        created,
        modified,
        data: { name: data.name },
      })),
    };
  };
  return list;
};
export default makeList;
