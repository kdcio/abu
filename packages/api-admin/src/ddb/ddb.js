import DynamoDB from "aws-sdk/clients/dynamodb";
import AWS from "aws-sdk/global";

const makeDDB = () => {
  const awsConfigs = {};
  const { DDB_REGION, DDB_ENDPOINT, DDB_TABLE } = process.env;
  awsConfigs.region = DDB_REGION;
  if (DDB_ENDPOINT) awsConfigs.endpoint = new AWS.Endpoint(DDB_ENDPOINT);

  const TableName = DDB_TABLE;
  const DocumentClient = new DynamoDB.DocumentClient(awsConfigs);

  return { TableName, DocumentClient };
};

export default makeDDB;
