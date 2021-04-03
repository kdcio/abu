const makeDBDelete = ({ model }) => {
  const dbDelete = async ({ modelId, id }) => {
    await model.delete({ modelId, id });
  };
  return dbDelete;
};
export default makeDBDelete;
