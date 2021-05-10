import faker from 'faker';
import init from '../src/init';
import changePassword from '../src/changePassword';

jest.mock('../src/init');

describe('Change Password', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    init.mockClear();
    delete process.env.COG_POOL_ID;
  });

  it('should change user password', async () => {
    process.env.COG_POOL_ID = 'pool-id';
    const fakeCog = {
      adminSetUserPassword: jest.fn().mockReturnValue({
        promise: () => Promise.resolve(),
      }),
    };
    init.mockImplementation(() => fakeCog);

    const email = 'john@doe.com';
    const password = faker.internet.password();
    await changePassword({ email, password });
    expect(init).toBeCalledTimes(1);
    expect(fakeCog.adminSetUserPassword).toBeCalledTimes(1);
    expect(fakeCog.adminSetUserPassword).toBeCalledWith({
      UserPoolId: 'pool-id',
      Username: email,
      Password: password,
      Permanent: true,
    });
  });

  it('should throw missing pool id', async () => {
    const email = 'john@doe.com';
    expect.assertions(1);
    await expect(
      changePassword({ email, password: faker.internet.password() })
    ).rejects.toEqual(new Error('Missing Cognito Pool Id'));
  });

  it('should throw missing email', async () => {
    process.env.COG_POOL_ID = 'pool-id';
    expect.assertions(1);
    await expect(changePassword({})).rejects.toEqual(
      new Error('Missing email')
    );
  });

  it('should throw missing password', async () => {
    process.env.COG_POOL_ID = 'pool-id';
    const email = 'john@doe.com';
    expect.assertions(1);
    await expect(changePassword({ email })).rejects.toEqual(
      new Error('Missing new password')
    );
  });
});
