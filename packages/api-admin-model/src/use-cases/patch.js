const makePatch = ({ model }) => {
  const patch = async (data) => {
    await model.update(data);
  };
  return patch;
};
export default makePatch;
