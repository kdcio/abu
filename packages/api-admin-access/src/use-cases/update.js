const makeUpdate = ({ model }) => {
  const update = async (data) => {
    await model.update(data);
  };
  return update;
};
export default makeUpdate;
