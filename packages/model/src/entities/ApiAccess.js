import { Entity } from 'dynamodb-toolbox';
import table from '../index';

const ApiAccess = new Entity({
  name: 'ApiAccess',
  attributes: {
    id: { partitionKey: true, prefix: 'API#' },
    sk: { sortKey: true, default: 'META', hidden: true },
    gsi1pk: { default: 'API', hidden: true },
    gsi1sk: { alias: 'name' },
    gsi2pk: { alias: 'key', prefix: 'KEY#' },
    read: { type: 'map', required: false },
    write: { type: 'map', required: false },
  },
  table,
});

export default ApiAccess;
