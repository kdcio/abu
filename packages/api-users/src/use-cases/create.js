const makeCreate = ({ createUser }) => {
  const create = async ({ email, group }) => {
    if (!email) throw new Error("Missing email");
    if (!group) throw new Error("Missing group");
    await createUser({ email, group });
  };
  return create;
};
export default makeCreate;
