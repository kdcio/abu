import makeDDB from "./ddb";

const deleteItem = async ({ item }) => {
  const { TableName, DocumentClient: ddb } = makeDDB();
  const params = {
    TableName,
    Key: {
      pk: item.pk,
      sk: item.sk,
    },
  };

  return ddb.delete(params).promise();
};

const deleteItems = async ({ Items }) => {
  const promises = [];
  Items.forEach((item) => {
    promises.push(deleteItem({ item }));
  });

  return Promise.all(promises);
};

export default deleteItems;
