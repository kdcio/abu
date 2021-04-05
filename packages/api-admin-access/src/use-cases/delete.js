const makeDBDelete = ({ model }) => {
  const dbDelete = async ({ id }) => {
    await model.delete({ id });
  };
  return dbDelete;
};
export default makeDBDelete;
