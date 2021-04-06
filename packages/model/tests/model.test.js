import { start } from 'helper';
import Model from '../src/entities/Model';
import Content from '../src/entities/Content';
import ApiAccess from '../src/entities/ApiAccess';

import models from './fixtures/models.json';
import contents from './fixtures/contents.json';
import apiAccesses from './fixtures/api-access.json';

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

  it(`should save api access`, async () => {
    const proms = [];
    apiAccesses.forEach((d) => {
      proms.push(ApiAccess.put({ ...d }));
    });
    await Promise.all(proms);

    let res = await ApiAccess.query('API', { index: 'GSI' });
    expect(res.Items).toHaveLength(5);

    res = await ApiAccess.query('KEY#d5c20ecf93f14fb68fd8f80e4e1eaa51', {
      index: 'GSI2',
    });
    expect(res.Items).toHaveLength(1);
  });
});
