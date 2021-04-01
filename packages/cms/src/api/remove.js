import API from "@aws-amplify/api";

const remove = async ({ apiName, id, path = "/" }) => {
  await API.del(apiName, `${path}${id}`);
};

export default remove;
