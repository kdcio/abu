import models from "../seed/model.json";
import accesses from "../seed/access.json";
import contents from "../seed/content.json";

const makeSeed = ({ Model, ApiAccess, Content, uuid }) => {
  const seed = async () => {
    const proms = [];
    models.forEach((model) => proms.push(Model.put(model)));

    accesses.forEach((access) => {
      const id = new Date().valueOf().toString();
      const key = uuid().replace(/-/g, "");
      proms.push(ApiAccess.put({ ...access, id, key }));
    });

    contents.forEach((content) => {
      const { modelId, id: inId, ...data } = content;
      const id = inId || new Date().valueOf().toString();
      proms.push(Content.put({ ...data, id, modelId }));
    });
    await Promise.all(proms);
  };
  return seed;
};

export default makeSeed;
