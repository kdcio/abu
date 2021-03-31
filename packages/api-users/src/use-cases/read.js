const makeRead = ({ readUser }) => {
  const read = async ({ email }) => {
    if (!email) throw new Error("Missing email");
    const res = await readUser({ email });
    return res;
  };
  return read;
};
export default makeRead;
