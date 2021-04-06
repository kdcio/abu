const makeCreate = ({ model }) => {
  const create = async ({ id: inId, ...data }) => {
    const id = inId || new Date().valueOf().toString();
    await model.put({ ...data, id });
    return { id };
  };
  return create;
};
export default makeCreate;
