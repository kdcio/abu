const makeDBDelete = ({ scan, deleteItems }) => {
  const dbDelete = async () => {
    const Items = await scan();
    await deleteItems({ Items });
  };
  return dbDelete;
};
export default makeDBDelete;
