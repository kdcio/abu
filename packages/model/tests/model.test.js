import { start } from 'helper';
import Model from '../src/entities/Model';

import models from './fixtures/models.json';

describe('Model', () => {
  beforeAll(async () => {
    await start();
  });

  it(`should save models`, async () => {
    const proms = [];
    models.forEach((d) => {
      proms.push(Model.put({ ...d }));
    });
    await Promise.all(proms);
    const res = await Model.query('MOD', { index: 'GSI' });
    expect(res.Items).toHaveLength(models.length);
  });
});
