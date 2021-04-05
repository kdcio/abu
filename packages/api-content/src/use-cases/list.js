const makeList = ({ model, encrypt, decrypt }) => {
  const list = async ({ modelId, cursor, limit = 10 }) => {
    const params = { index: "GSI", reverse: true, limit: parseInt(limit, 10) };
    if (cursor) {
      const decoded = decrypt(cursor, process.env.PAGINATION_SECRET);
      params.startKey = JSON.parse(decoded);
    }

    const { Items, LastEvaluatedKey } = await model.query(
      `MOD#${modelId}#CON`,
      params
    );

    let lastKey = null;
    if (LastEvaluatedKey) {
      lastKey = encrypt(
        JSON.stringify(LastEvaluatedKey),
        process.env.PAGINATION_SECRET
      );
    }

    return {
      Items: Items.map(({ id, created, modified, data }) => ({
        id,
        created,
        modified,
        data: { name: data.name },
      })),
      cursor: lastKey,
    };
  };
  return list;
};
export default makeList;
