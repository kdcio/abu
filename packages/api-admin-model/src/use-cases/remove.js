const makeRemove = ({ model }) => {
  const remove = async ({ id }) => {
    await model.delete({ id });
  };
  return remove;
};
export default makeRemove;
