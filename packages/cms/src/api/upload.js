import API from "@aws-amplify/api";

const update = async ({ apiName, id, data, path = "/", pathSuffix = "" }) => {
  const params = {
    headers: { "Content-Type": "application/json" },
    body: { ...data },
  };
  await API.put(apiName, `${path}${id}${pathSuffix}`, params);
};

export default update;
