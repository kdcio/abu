const makeRead = ({ readUser }) => {
  const read = async ({ username }) => {
    const res = await readUser({ email: username });
    return res;
  };
  return read;
};
export default makeRead;
