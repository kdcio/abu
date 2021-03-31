import init from '../src/init';
import read from '../src/read';

jest.mock('../src/init');

describe('Read user', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    init.mockClear();
    delete process.env.COG_POOL_ID;
  });

  it('should read user', async () => {
    process.env.COG_POOL_ID = 'pool-id';
    const fakeCog = {
      adminGetUser: jest.fn().mockReturnValue({
        promise: () => Promise.resolve(),
      }),
    };
    init.mockImplementation(() => fakeCog);

    const email = 'john@doe.com';
    await read({ email });
    expect(init).toBeCalledTimes(1);
    expect(fakeCog.adminGetUser).toBeCalledTimes(1);
    expect(fakeCog.adminGetUser).toBeCalledWith({
      UserPoolId: 'pool-id',
      Username: email,
    });
  });

  it('should throw missing pool id', async () => {
    const email = 'john@doe.com';
    expect.assertions(1);
    await expect(read({ email })).rejects.toEqual(
      new Error('Missing Cognito Pool Id')
    );
  });

  it('should throw missing email', async () => {
    process.env.COG_POOL_ID = 'pool-id';
    expect.assertions(1);
    await expect(read({})).rejects.toEqual(new Error('Missing email'));
  });
});
