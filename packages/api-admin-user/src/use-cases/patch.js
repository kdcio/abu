const makePatch = ({ updateUser, setGroup }) => {
  const patch = async ({
    username,
    firstName,
    lastName,
    oldGroup,
    newGroup,
  }) => {
    const proms = [];
    if (firstName && lastName) {
      proms.push(
        updateUser({ email: username, attributes: { firstName, lastName } })
      );
    }
    if (oldGroup && newGroup) {
      proms.push(setGroup({ email: username, oldGroup, newGroup }));
    }
    await Promise.all(proms);
  };
  return patch;
};
export default makePatch;
