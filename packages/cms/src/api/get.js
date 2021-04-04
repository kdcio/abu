import API from "@aws-amplify/api";

const get = async ({ apiName, id, path = "/", pathSuffix = "", qs = {} }) => {
  const params = { queryStringParameters: qs };
  const response = await API.get(apiName, `${path}${id}${pathSuffix}`, params);
  return response;
};

export default get;
