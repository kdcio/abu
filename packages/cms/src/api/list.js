import API from "@aws-amplify/api";

const list = async ({ apiName, path = "/" }) => {
  const response = await API.get(apiName, path);
  return response;
};

export default list;
