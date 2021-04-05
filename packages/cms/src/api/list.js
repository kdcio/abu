import API from "@aws-amplify/api";

const list = async ({ apiName, path = "/", qs = {} }) => {
  const params = { queryStringParameters: qs };
  const response = await API.get(apiName, path, params);
  return response;
};

export default list;
