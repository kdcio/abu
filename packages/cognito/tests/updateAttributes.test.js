import init from '../src/init';
import updateAttributes from '../src/updateAttributes';

jest.mock('../src/init');

describe('Update Attributes', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    init.mockClear();
    delete process.env.COG_POOL_ID;
  });

  it('should change user password', async () => {
    process.env.COG_POOL_ID = 'pool-id';
    const fakeCog = {
      adminUpdateUserAttributes: jest.fn().mockReturnValue({
        promise: () => Promise.resolve(),
      }),
    };
    init.mockImplementation(() => fakeCog);

    const email = 'john@doe.com';
    const attributes = {
      firstName: 'john',
      lastName: 'doe',
    };
    await updateAttributes({ email, attributes });
    expect(init).toBeCalledTimes(1);
    expect(fakeCog.adminUpdateUserAttributes).toBeCalledTimes(1);
    expect(fakeCog.adminUpdateUserAttributes).toBeCalledWith({
      UserPoolId: 'pool-id',
      Username: email,
      UserAttributes: [
        {
          Name: 'given_name',
          Value: attributes.firstName,
        },
        {
          Name: 'family_name',
          Value: attributes.lastName,
        },
      ],
    });
  });

  it('should throw missing pool id', async () => {
    const email = 'john@doe.com';
    expect.assertions(1);
    await expect(updateAttributes({ email })).rejects.toEqual(
      new Error('Missing Cognito Pool Id')
    );
  });

  it('should throw missing email', async () => {
    process.env.COG_POOL_ID = 'pool-id';
    expect.assertions(1);
    await expect(updateAttributes({})).rejects.toEqual(
      new Error('Missing email')
    );
  });

  it('should throw missing attributes', async () => {
    process.env.COG_POOL_ID = 'pool-id';
    const email = 'john@doe.com';
    expect.assertions(1);
    await expect(updateAttributes({ email })).rejects.toEqual(
      new Error('Missing attributes')
    );
  });

  it('should throw missing first name', async () => {
    process.env.COG_POOL_ID = 'pool-id';
    const email = 'john@doe.com';
    const attributes = {};
    expect.assertions(1);
    await expect(updateAttributes({ email, attributes })).rejects.toEqual(
      new Error('Missing first name')
    );
  });

  it('should throw missing last name', async () => {
    process.env.COG_POOL_ID = 'pool-id';
    const email = 'john@doe.com';
    const attributes = { firstName: 'john' };
    expect.assertions(1);
    await expect(updateAttributes({ email, attributes })).rejects.toEqual(
      new Error('Missing last name')
    );
  });
});
