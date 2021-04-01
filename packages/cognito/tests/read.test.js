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
    const email = 'john@doe.com';
    const user = {
      Username: 'fc2c8bb1-ada6-41d7-8451-fee42ad0d5d7',
      UserAttributes: [
        { Name: 'sub', Value: 'fc2c8bb1-ada6-41d7-8451-fee42ad0d5d7' },
        { Name: 'given_name', Value: 'John' },
        { Name: 'family_name', Value: 'Doe' },
        { Name: 'email', Value: email },
      ],
      UserCreateDate: '2021-03-29T01:05:14.954Z',
      UserLastModifiedDate: '2021-03-29T01:12:50.287Z',
      Enabled: true,
      UserStatus: 'CONFIRMED',
    };
    const groups = {
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
      adminGetUser: jest.fn().mockReturnValue({
        promise: () => Promise.resolve(user),
      }),
      adminListGroupsForUser: jest.fn().mockReturnValue({
        promise: () => Promise.resolve(groups),
      }),
    };
    init.mockImplementation(() => fakeCog);

    const res = await read({ email });
    expect(init).toBeCalledTimes(1);
    expect(fakeCog.adminGetUser).toBeCalledTimes(1);
    expect(fakeCog.adminGetUser).toBeCalledWith({
      UserPoolId: 'pool-id',
      Username: email,
    });

    expect(res.created).toBe(user.UserCreateDate);
    expect(res.updated).toBe(user.UserLastModifiedDate);
    expect(res.statues).toBe(user.UserStatus);
    expect(res.username).toBe(user.Username);
    expect(res.sub).toBe('fc2c8bb1-ada6-41d7-8451-fee42ad0d5d7');
    expect(res.given_name).toBe('John');
    expect(res.family_name).toBe('Doe');
    expect(res.email).toBe(email);
    expect(res.groups).toEqual(['admin']);
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
