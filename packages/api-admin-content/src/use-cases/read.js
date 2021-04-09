const makeRead = ({ model }) => {
  const read = async ({ modelId, id }) => {
    const res = await model.get({ modelId, id });
    if (res?.Item)
      return {
        data: res.Item.data,
        created: res.Item.created,
        modified: res.Item.modified,
        id,
      };
    throw new Error("Content not found");
  };
  return read;
};
export default makeRead;
