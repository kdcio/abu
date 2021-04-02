import { start } from 'helper';
import Model from '../src/entities/Model';
import Content from '../src/entities/Content';

import models from './fixtures/models.json';
import contents from './fixtures/contents.json';

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

  it(`should save contents`, async () => {
    const proms = [];
    contents.forEach((d) => {
      proms.push(Content.put({ ...d }));
    });
    await Promise.all(proms);

    const res = await Content.query('MOD#home#CON', { index: 'GSI' });
    expect(res.Items).toHaveLength(1);
  });
});
