const DynamoDB = require("aws-sdk/clients/dynamodb");
const schema = require("../../../infra/schema.json");

const dropTableIfExists = async ({ dynamoDB, TableName }) => {
  const { TableNames } = await dynamoDB.listTables().promise();
  if (!TableNames.includes(TableName)) return;
  await dynamoDB.deleteTable({ TableName }).promise();
};

const createTable = ({ dynamoDB, TableName }) =>
  dynamoDB
    .createTable({
      ...schema,
      TableName,
    })
    .promise();

const start = async () => {
  const TableName = process.env.DDB_TABLE;
  const awsConfigs = {
    region: process.env.DDB_REGION,
    endpoint: process.env.DDB_ENDPOINT,
  };
  const dynamoDB = new DynamoDB(awsConfigs);

  await dropTableIfExists({ dynamoDB, TableName });
  await createTable({ dynamoDB, TableName });

  const DocumentClient = new DynamoDB.DocumentClient(awsConfigs);
  return { DocumentClient, TableName };
};

module.exports = {
  dropTableIfExists,
  createTable,
  start,
};
