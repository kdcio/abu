const makeListAll = ({ model }) => {
  const listAll = async ({ modelId, lastModified }) => {
    const params = {
      index: "GSI",
      reverse: true,
      gt: lastModified || new Date(0).toISOString(),
    };

    let allItems = [];

    do {
      const { Items, LastEvaluatedKey } = await model.query(
        `MOD#${modelId}#CON`,
        params
      );

      allItems = [
        ...allItems,
        ...Items.map(({ id, created, modified, data }) => ({
          ...data,
          id,
          created,
          modified,
        })),
      ];

      params.startKey = LastEvaluatedKey;
    } while (params.startKey);

    return { Items: allItems };
  };
  return listAll;
};
export default makeListAll;
