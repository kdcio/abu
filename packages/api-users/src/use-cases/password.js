const makePassword = ({ changePassword }) => {
  const password = async ({ username, password: newPassword }) => {
    if (!newPassword) throw new Error("Missing password");
    await changePassword({
      email: username,
      password: newPassword,
    });
  };
  return password;
};
export default makePassword;
