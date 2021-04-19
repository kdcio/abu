import models from "../seed/model.json";
import accesses from "../seed/access.json";
import contents from "../seed/content.json";

const makeSeed = ({ Model, ApiAccess, Content, uuid }) => {
  const seed = async () => {
    const modelProms = [];
    models.forEach((model) => modelProms.push(Model.put(model)));
    await Promise.all(modelProms);

    const accessProms = [];
    accesses.forEach((access) => {
      const id = new Date().valueOf().toString();
      const key = uuid().replace(/-/g, "");
      accessProms.push(ApiAccess.put({ ...access, id, key }));
    });
    await Promise.all(accessProms);

    const contentProms = [];
    contents.forEach((content) => {
      const { modelId, id: inId, ...data } = content;
      const id = inId || new Date().valueOf().toString();
      contentProms.push(Content.put({ ...data, id, modelId }));
    });
    await Promise.all(contentProms);
  };
  return seed;
};
export default makeSeed;
