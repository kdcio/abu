import init from '../src/init';
import create from '../src/create';

jest.mock('../src/init');

describe('Create user', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    init.mockClear();
    delete process.env.COG_POOL_ID;
  });

  it('should create user as editor', async () => {
    process.env.COG_POOL_ID = 'pool-id';
    const fakeCog = {
      adminCreateUser: jest.fn().mockReturnValue({
        promise: () => Promise.resolve(),
      }),
      adminAddUserToGroup: jest.fn().mockReturnValue({
        promise: () => Promise.resolve(),
      }),
    };
    init.mockImplementation(() => fakeCog);

    const email = 'john@doe.com';
    await create({ email });
    expect(init).toBeCalledTimes(1);
    expect(fakeCog.adminCreateUser).toBeCalledTimes(1);
    expect(fakeCog.adminAddUserToGroup).toBeCalledTimes(1);
    expect(fakeCog.adminCreateUser).toBeCalledWith({
      UserPoolId: 'pool-id',
      Username: email,
    });
    expect(fakeCog.adminAddUserToGroup).toBeCalledWith({
      UserPoolId: 'pool-id',
      Username: email,
      GroupName: 'editor',
    });
  });

  it('should create user as addmin', async () => {
    process.env.COG_POOL_ID = 'pool-id';
    const fakeCog = {
      adminCreateUser: jest.fn().mockReturnValue({
        promise: () => Promise.resolve(),
      }),
      adminAddUserToGroup: jest.fn().mockReturnValue({
        promise: () => Promise.resolve(),
      }),
    };
    init.mockImplementation(() => fakeCog);

    const email = 'john@doe.com';
    const group = 'admin';
    await create({ email, group });
    expect(init).toBeCalledTimes(1);
    expect(fakeCog.adminCreateUser).toBeCalledTimes(1);
    expect(fakeCog.adminAddUserToGroup).toBeCalledTimes(1);
    expect(fakeCog.adminCreateUser).toBeCalledWith({
      UserPoolId: 'pool-id',
      Username: email,
    });
    expect(fakeCog.adminAddUserToGroup).toBeCalledWith({
      UserPoolId: 'pool-id',
      Username: email,
      GroupName: group,
    });
  });

  it('should throw missing pool id', async () => {
    const email = 'john@doe.com';
    expect.assertions(1);
    await expect(create({ email })).rejects.toEqual(
      new Error('Missing Cognito Pool Id')
    );
  });

  it('should throw missing email', async () => {
    process.env.COG_POOL_ID = 'pool-id';
    expect.assertions(1);
    await expect(create({})).rejects.toEqual(new Error('Missing email'));
  });
});
