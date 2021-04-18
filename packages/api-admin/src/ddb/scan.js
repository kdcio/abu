import makeDDB from "./ddb";

const scan = async () => {
  const { TableName, DocumentClient: ddb } = makeDDB();
  const params = { TableName };

  const { Items } = await ddb.scan(params).promise();
  return Items;
};

export default scan;
