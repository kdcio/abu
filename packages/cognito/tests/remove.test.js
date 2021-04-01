import init from '../src/init';
import remove from '../src/remove';

jest.mock('../src/init');

describe('Delete user', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    init.mockClear();
    delete process.env.COG_POOL_ID;
  });

  it('should delete user', async () => {
    process.env.COG_POOL_ID = 'pool-id';
    const fakeCog = {
      adminDeleteUser: jest.fn().mockReturnValue({
        promise: () => Promise.resolve(),
      }),
    };
    init.mockImplementation(() => fakeCog);

    const email = 'john@doe.com';
    await remove({ email });
    expect(init).toBeCalledTimes(1);
    expect(fakeCog.adminDeleteUser).toBeCalledTimes(1);
    expect(fakeCog.adminDeleteUser).toBeCalledWith({
      UserPoolId: 'pool-id',
      Username: email,
    });
  });

  it('should throw missing pool id', async () => {
    const email = 'john@doe.com';
    expect.assertions(1);
    await expect(remove({ email })).rejects.toEqual(
      new Error('Missing Cognito Pool Id')
    );
  });

  it('should throw missing email', async () => {
    process.env.COG_POOL_ID = 'pool-id';
    expect.assertions(1);
    await expect(remove({})).rejects.toEqual(new Error('Missing email'));
  });
});
