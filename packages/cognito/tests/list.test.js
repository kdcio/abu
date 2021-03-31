import init from '../src/init';
import list from '../src/list';

jest.mock('../src/init');

describe('List users', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    init.mockClear();
    delete process.env.COG_POOL_ID;
  });

  it('should list users', async () => {
    process.env.COG_POOL_ID = 'pool-id';
    const fakeCog = {
      listUsers: jest.fn().mockReturnValue({
        promise: () => Promise.resolve(),
      }),
    };
    init.mockImplementation(() => fakeCog);

    await list();
    expect(init).toBeCalledTimes(1);
    expect(fakeCog.listUsers).toBeCalledTimes(1);
    expect(fakeCog.listUsers).toBeCalledWith({
      UserPoolId: 'pool-id',
    });
  });

  it('should throw missing pool id', async () => {
    expect.assertions(1);
    await expect(list()).rejects.toEqual(new Error('Missing Cognito Pool Id'));
  });
});
