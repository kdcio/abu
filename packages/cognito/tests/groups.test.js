import init from '../src/init';
import groups from '../src/groups';

jest.mock('../src/init');

describe('User groups', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    init.mockClear();
    delete process.env.COG_POOL_ID;
  });

  it('should read user', async () => {
    process.env.COG_POOL_ID = 'pool-id';
    const email = 'john@doe.com';
    const data = {
      Groups: [
        {
          GroupName: 'admin',
          UserPoolId: 'ap-southeast-1_xxxxxxxxx',
          LastModifiedDate: '2021-03-29T00:53:47.634Z',
          CreationDate: '2021-03-29T00:53:47.634Z',
        },
      ],
    };
    const fakeCog = {
      adminListGroupsForUser: jest.fn().mockReturnValue({
        promise: () => Promise.resolve(data),
      }),
    };
    init.mockImplementation(() => fakeCog);

    const res = await groups({ email });
    expect(init).toBeCalledTimes(1);
    expect(fakeCog.adminListGroupsForUser).toBeCalledTimes(1);
    expect(fakeCog.adminListGroupsForUser).toBeCalledWith({
      UserPoolId: 'pool-id',
      Username: email,
    });

    expect(res).toEqual(['admin']);
  });

  it('should throw missing pool id', async () => {
    const email = 'john@doe.com';
    expect.assertions(1);
    await expect(groups({ email })).rejects.toEqual(
      new Error('Missing Cognito Pool Id')
    );
  });

  it('should throw missing email', async () => {
    process.env.COG_POOL_ID = 'pool-id';
    expect.assertions(1);
    await expect(groups({})).rejects.toEqual(new Error('Missing email'));
  });
});
