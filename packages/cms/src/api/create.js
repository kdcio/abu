import API from "@aws-amplify/api";

const create = async ({ apiName, data, path = "/" }) => {
  const params = {
    headers: { "Content-Type": "application/json" },
    body: { ...data },
  };
  const response = await API.post(apiName, path, params);
  return response;
};

export default create;
