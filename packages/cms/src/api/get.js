import API from "@aws-amplify/api";

const get = async ({ apiName, id, path = "/" }) => {
  const response = await API.get(apiName, `${path}${id}`);
  return response;
};

export default get;
