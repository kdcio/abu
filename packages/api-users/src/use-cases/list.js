const makeList = ({ listUsers }) => {
  const list = async () => {
    const res = await listUsers();
    return res;
  };
  return list;
};
export default makeList;
