import API from "@aws-amplify/api";

const update = async ({ apiName, id, data, path = "/" }) => {
  const params = {
    headers: { "Content-Type": "application/json" },
    body: { ...data },
  };
  await API.patch(apiName, `${path}${id}`, params);
};

export default update;
