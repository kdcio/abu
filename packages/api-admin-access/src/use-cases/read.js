const makeRead = ({ model }) => {
  const read = async ({ id }) => {
    const res = await model.get({ id });
    if (res?.Item) return res.Item;
    throw new Error("API not found");
  };
  return read;
};
export default makeRead;
