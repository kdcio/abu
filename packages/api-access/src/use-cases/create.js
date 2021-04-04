const makeCreate = ({ model, uuid }) => {
  const create = async ({ ...data }) => {
    const id = new Date().valueOf();
    const key = uuid();
    await model.put({ ...data, id, key });
    return { id };
  };
  return create;
};
export default makeCreate;
