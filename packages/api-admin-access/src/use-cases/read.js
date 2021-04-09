const makeRead = ({ model }) => {
  const read = async ({ id }) => {
    const res = await model.get({ id });
    if (res?.Item) {
      const { entity, ...data } = res.Item;
      return data;
    }

    throw new Error("API not found");
  };
  return read;
};
export default makeRead;
