import init from '../src/init';
import setGroup from '../src/setGroup';

jest.mock('../src/init');

describe('Set user group', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    init.mockClear();
    delete process.env.COG_POOL_ID;
  });

  it('should change user group to admin', async () => {
    process.env.COG_POOL_ID = 'pool-id';
    const fakeCog = {
      adminRemoveUserFromGroup: jest.fn().mockReturnValue({
        promise: () => Promise.resolve(),
      }),
      adminAddUserToGroup: jest.fn().mockReturnValue({
        promise: () => Promise.resolve(),
      }),
    };
    init.mockImplementation(() => fakeCog);

    const email = 'john@doe.com';
    const oldGroup = 'editor';
    const newGroup = 'admin';
    await setGroup({ email, oldGroup, newGroup });
    expect(init).toBeCalledTimes(1);
    expect(fakeCog.adminRemoveUserFromGroup).toBeCalledTimes(1);
    expect(fakeCog.adminAddUserToGroup).toBeCalledTimes(1);
    expect(fakeCog.adminRemoveUserFromGroup).toBeCalledWith({
      UserPoolId: 'pool-id',
      Username: email,
      GroupName: oldGroup,
    });
    expect(fakeCog.adminAddUserToGroup).toBeCalledWith({
      UserPoolId: 'pool-id',
      Username: email,
      GroupName: newGroup,
    });
  });

  it('should throw missing pool id', async () => {
    const email = 'john@doe.com';
    const oldGroup = 'editor';
    const newGroup = 'admin';
    expect.assertions(1);
    await expect(setGroup({ email, oldGroup, newGroup })).rejects.toEqual(
      new Error('Missing Cognito Pool Id')
    );
  });

  it('should throw missing old group', async () => {
    process.env.COG_POOL_ID = 'pool-id';
    const email = 'john@doe.com';
    expect.assertions(1);
    await expect(setGroup({ email })).rejects.toEqual(
      new Error('Missing old group')
    );
  });

  it('should throw missing new group', async () => {
    process.env.COG_POOL_ID = 'pool-id';
    const email = 'john@doe.com';
    const oldGroup = 'editor';
    expect.assertions(1);
    await expect(setGroup({ email, oldGroup })).rejects.toEqual(
      new Error('Missing new group')
    );
  });

  it('should throw missing email', async () => {
    process.env.COG_POOL_ID = 'pool-id';
    expect.assertions(1);
    await expect(setGroup({})).rejects.toEqual(new Error('Missing email'));
  });
});
