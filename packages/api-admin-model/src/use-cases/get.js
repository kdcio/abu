const makeGet = ({ model }) => {
  const get = async ({ id }) => {
    const res = await model.get({ id });
    if (res?.Item) return res.Item;
    throw new Error("Model not found");
  };
  return get;
};
export default makeGet;
