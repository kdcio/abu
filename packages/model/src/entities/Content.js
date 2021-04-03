import { Entity } from 'dynamodb-toolbox';
import table from '../index';

const Content = new Entity({
  name: 'Content',
  attributes: {
    modelId: { partitionKey: true, prefix: 'MOD#' },
    id: { sortKey: true, prefix: 'CON#' },
    pk2: { default: (data) => `MOD#${data.modelId}#CON` },
    sk2: { default: (data) => data.created() },
    data: { type: 'map', required: false },
  },
  table,
});

export default Content;
