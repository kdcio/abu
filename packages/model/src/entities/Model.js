import { Entity } from 'dynamodb-toolbox';
import table from '../index';

const Model = new Entity({
  name: 'Model',
  attributes: {
    id: { partitionKey: true, prefix: 'MOD#' },
    sk: { sortKey: true, default: 'META', hidden: true },
    gsi1pk: { default: 'MOD', hidden: true },
    gsi1sk: { alias: 'name' },
    fields: { type: 'list', required: false },
    collection: { type: 'boolean' },
  },
  table,
});

export default Model;
