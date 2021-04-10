import DynamoDB from 'aws-sdk/clients/dynamodb';
import AWS from 'aws-sdk/global';
import Debug from 'debug';

const debug = Debug('model:db');

const access = () => {
  const awsConfigs = {};
  const { DDB_REGION, DDB_ENDPOINT, DDB_TABLE } = process.env;
  awsConfigs.region = DDB_REGION;
  if (DDB_ENDPOINT) awsConfigs.endpoint = new AWS.Endpoint(DDB_ENDPOINT);
  debug(awsConfigs);

  const TableName = DDB_TABLE;
  const DocumentClient = new DynamoDB.DocumentClient(awsConfigs);

  return { TableName, DocumentClient };
};

export default access;
