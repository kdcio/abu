const makeList = ({ model }) => {
  const list = async () => {
    const res = await model.query(`MOD`, { index: "GSI" });
    return res;
  };
  return list;
};
export default makeList;
