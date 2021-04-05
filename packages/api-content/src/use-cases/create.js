const makeCreate = ({ model }) => {
  const create = async ({ modelId, id: inId, ...data }) => {
    const id = inId || new Date().valueOf();
    await model.put({ modelId, id, data });
    return { id };
  };
  return create;
};
export default makeCreate;
