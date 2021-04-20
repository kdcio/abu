const makeListAll = ({ model, modelModel }) => {
  const listAll = async ({
    modelId,
    lastModified,
    fields: includeFields = false,
  }) => {
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

    const data = { Items: allItems };
    if (includeFields) {
      const { Item } = await modelModel.get({ id: modelId });
      data.fields = Item?.fields;
    }

    return data;
  };
  return listAll;
};
export default makeListAll;
