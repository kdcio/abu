const makeUpdate = ({ model }) => {
  const update = async (data) => {
    await model.put(data);
  };
  return update;
};
export default makeUpdate;
