const makeCreate = ({ model }) => {
  const create = async (data) => {
    const id = new Date().valueOf();
    await model.put({ ...data, id });
    return { id };
  };
  return create;
};
export default makeCreate;
