const makeRemove = ({ removeUser }) => {
  const remove = async ({ username }) => {
    const res = await removeUser({ email: username });
    return res;
  };
  return remove;
};
export default makeRemove;
