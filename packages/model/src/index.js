import { Table } from 'dynamodb-toolbox';
import access from './access';

const createTable = () => {
  const { TableName, DocumentClient } = access();
  const table = new Table({
    name: TableName,
    partitionKey: 'pk',
    sortKey: 'sk',
    indexes: {
      GSI: { partitionKey: 'gsi1pk', sortKey: 'gsi1sk' },
      GSI2: { partitionKey: 'gsi2pk' },
    },
    DocumentClient,
  });
  return table;
};

export default createTable();
