const makeCreate = ({ model }) => {
  const create = async ({ id: inId, ...data }) => {
    const id = inId || new Date().valueOf();
    await model.put({ ...data, id });
    return { id };
  };
  return create;
};
export default makeCreate;
