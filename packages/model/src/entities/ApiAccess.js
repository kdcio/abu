import { Entity } from 'dynamodb-toolbox';
import table from '../index';

const ApiAccess = new Entity({
  name: 'ApiAccess',
  attributes: {
    id: { partitionKey: true, prefix: 'API#' },
    sk: { sortKey: true, default: 'META', hidden: true },
    pk2: { default: 'API', hidden: true },
    sk2: { alias: 'name' },
    pk3: { alias: 'key', prefix: 'KEY#' },
    read: { type: 'map', required: false },
    write: { type: 'map', required: false },
  },
  table,
});

export default ApiAccess;
