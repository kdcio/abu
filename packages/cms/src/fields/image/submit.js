import get from "api/get";

const getUrl = async (modeId, file) => {
  const filename = file.name;
  const type = file.type;
  return get({
    apiName: "Content",
    id: modeId,
    pathSuffix: `/upload`,
    qs: { filename, type },
  });
};

const upload = async (url, file) => {
  return fetch(url, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": file.type,
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
  });
};

const submit = async ({ model, file }) => {
  const { url, target } = await getUrl(model.id, file);
  await upload(url, file);
  return target;
};

export default submit;
