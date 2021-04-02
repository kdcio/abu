const makePatch = ({ model }) => {
  const patch = async ({ id, ...others }) => {
    await model.put({ ...others, id });
  };
  return patch;
};
export default makePatch;
