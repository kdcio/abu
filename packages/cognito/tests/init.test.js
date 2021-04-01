import CognitoIdentityServiceProvider from 'aws-sdk/clients/cognitoidentityserviceprovider';
import init from '../src/init';

jest.mock('aws-sdk/clients/cognitoidentityserviceprovider');

describe('Init', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    CognitoIdentityServiceProvider.mockClear();
    delete process.env.COG_REGION;
    delete process.env.AWS_REGION;
    delete process.env.COG_ACCESS_KEY_ID;
    delete process.env.AWS_ACCESS_KEY_ID;
    delete process.env.COG_SECRET_ACCESS_KEY;
    delete process.env.AWS_SECRET_ACCESS_KEY;
  });

  it('should have no params', async () => {
    init();
    expect(CognitoIdentityServiceProvider).toBeCalledTimes(1);
    expect(CognitoIdentityServiceProvider).toBeCalledWith({});
  });

  it('should use COG_REGION', async () => {
    const region = 'ap-southeast-1';
    process.env.COG_REGION = region;
    process.env.AWS_REGION = 'us-east-1';
    init();
    expect(CognitoIdentityServiceProvider).toBeCalledTimes(1);
    expect(CognitoIdentityServiceProvider).toBeCalledWith({
      region,
    });
  });

  it('should use AWS_REGION', async () => {
    const region = 'us-east-1';
    process.env.AWS_REGION = region;
    init();
    expect(CognitoIdentityServiceProvider).toBeCalledTimes(1);
    expect(CognitoIdentityServiceProvider).toBeCalledWith({
      region,
    });
  });

  it('should use COG_ACCESS_KEY_ID', async () => {
    const accessKeyId = 'access-key-id';
    process.env.COG_ACCESS_KEY_ID = accessKeyId;
    process.env.AWS_ACCESS_KEY_ID = 'aws-access-key-id';
    init();
    expect(CognitoIdentityServiceProvider).toBeCalledTimes(1);
    expect(CognitoIdentityServiceProvider).toBeCalledWith({
      accessKeyId,
    });
  });

  it('should use AWS_ACCESS_KEY_ID', async () => {
    const accessKeyId = 'access-key-id';
    process.env.AWS_ACCESS_KEY_ID = accessKeyId;
    init();
    expect(CognitoIdentityServiceProvider).toBeCalledTimes(1);
    expect(CognitoIdentityServiceProvider).toBeCalledWith({
      accessKeyId,
    });
  });

  it('should use COG_SECRET_ACCESS_KEY', async () => {
    const secretAccessKey = 'secret-access-key';
    process.env.COG_SECRET_ACCESS_KEY = secretAccessKey;
    process.env.AWS_SECRET_ACCESS_KEY = 'aws-secret-access-key';
    init();
    expect(CognitoIdentityServiceProvider).toBeCalledTimes(1);
    expect(CognitoIdentityServiceProvider).toBeCalledWith({
      secretAccessKey,
    });
  });

  it('should use AWS_SECRET_ACCESS_KEY', async () => {
    const secretAccessKey = 'secret-access-key';
    process.env.AWS_SECRET_ACCESS_KEY = secretAccessKey;
    init();
    expect(CognitoIdentityServiceProvider).toBeCalledTimes(1);
    expect(CognitoIdentityServiceProvider).toBeCalledWith({
      secretAccessKey,
    });
  });

  it('should use COG and REGION', async () => {
    const region = 'ap-southeast-1';
    const accessKeyId = 'access-key-id';
    const secretAccessKey = 'secret-access-key';
    process.env.COG_REGION = region;
    process.env.COG_ACCESS_KEY_ID = accessKeyId;
    process.env.COG_SECRET_ACCESS_KEY = secretAccessKey;
    init();
    expect(CognitoIdentityServiceProvider).toBeCalledTimes(1);
    expect(CognitoIdentityServiceProvider).toBeCalledWith({
      region,
      accessKeyId,
      secretAccessKey,
    });
  });

  it('should use AWS and REGION', async () => {
    const region = 'us-east-1';
    const accessKeyId = 'access-key-id';
    const secretAccessKey = 'secret-access-key';
    process.env.AWS_REGION = region;
    process.env.AWS_ACCESS_KEY_ID = accessKeyId;
    process.env.AWS_SECRET_ACCESS_KEY = secretAccessKey;
    init();
    expect(CognitoIdentityServiceProvider).toBeCalledTimes(1);
    expect(CognitoIdentityServiceProvider).toBeCalledWith({
      region,
      accessKeyId,
      secretAccessKey,
    });
  });
});
