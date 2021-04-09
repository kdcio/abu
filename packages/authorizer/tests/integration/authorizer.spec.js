import { start } from 'helper';
import ApiAccess from 'model/lib/entities/ApiAccess';
import authorize from '../../src';

import apiAccesses from '../fixtures/blog-full.json';
import expected from '../fixtures/expected-blog-full.json';

describe('Authorizer', () => {
  beforeAll(async () => {
    await start();
    const proms = [];
    apiAccesses.forEach((d) => {
      proms.push(ApiAccess.put({ ...d }));
    });
    await Promise.all(proms);
  });

  it('should give blog full access', async () => {
    const token = apiAccesses[0].key;
    const methodArn =
      'arn:aws:execute-api:localhost:random-account-id:random-api-id/local/GET/content/blog';

    const response = await authorize({ token, methodArn });
    expect(response).toEqual(expected);
  });

  it('should throw an error for unauthorized key', async () => {
    expect.assertions(1);
    const token = 'invalid-key';
    const methodArn =
      'arn:aws:execute-api:localhost:random-account-id:random-api-id/local/GET/content/blog';

    try {
      await authorize({ token, methodArn });
    } catch (error) {
      expect(error.message).toBe('Unauthorized');
    }
  });
});
