import { Table } from 'dynamodb-toolbox';
import access from './access';

const createTable = () => {
  const { TableName, DocumentClient } = access();
  const table = new Table({
    name: TableName,
    partitionKey: 'pk',
    sortKey: 'sk',
    indexes: {
      GSI: { partitionKey: 'pk2', sortKey: 'sk2' },
      GSI2: { partitionKey: 'pk3' },
    },
    DocumentClient,
  });
  return table;
};

export default createTable();
