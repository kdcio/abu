import init from '../src/init';
import list from '../src/list';

import admins from './fixtures/admins.json';
import editors from './fixtures/editors.json';
import expected from './fixtures/list-expected.json';

jest.mock('../src/init');

describe('List users', () => {
  beforeEach(() => {
    init.mockClear();
    delete process.env.COG_POOL_ID;
  });

  it('should list users', async () => {
    process.env.COG_POOL_ID = 'pool-id';

    const fakeCog = {
      listUsersInGroup: jest
        .fn()
        .mockImplementationOnce(() => ({
          promise: () => Promise.resolve(admins),
        }))
        .mockImplementationOnce(() => ({
          promise: () => Promise.resolve(editors),
        })),
    };
    init.mockImplementation(() => fakeCog);

    const res = await list();
    expect(init).toBeCalledTimes(1);
    expect(fakeCog.listUsersInGroup).toBeCalledTimes(2);
    expect(res).toEqual(expected);
  });

  it('should throw missing pool id', async () => {
    expect.assertions(1);
    await expect(list()).rejects.toEqual(new Error('Missing Cognito Pool Id'));
  });
});
