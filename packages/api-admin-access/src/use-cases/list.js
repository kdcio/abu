const makeList = ({ model, encrypt, decrypt }) => {
  const list = async ({ cursor, limit = 10 }) => {
    const params = { index: "GSI", limit: parseInt(limit, 10) };
    if (cursor) {
      const decoded = decrypt(cursor, process.env.PAGINATION_SECRET);
      params.startKey = JSON.parse(decoded);
    }

    const { Items, LastEvaluatedKey } = await model.query(`API`, params);

    let lastKey = null;
    if (LastEvaluatedKey) {
      lastKey = encrypt(
        JSON.stringify(LastEvaluatedKey),
        process.env.PAGINATION_SECRET
      );
    }

    return {
      Items: Items.map(({ id, created, modified, name }) => ({
        id,
        created,
        modified,
        name,
      })),
      cursor: lastKey,
    };
  };
  return list;
};
export default makeList;
