const makeCreate = ({ model }) => {
  const create = async ({ id, name, ...data }) => {
    if (!id) throw new Error("Missing id");
    if (!name) throw new Error("Missing name");

    await model.put({ id, name, ...data });
    return { id };
  };
  return create;
};
export default makeCreate;
