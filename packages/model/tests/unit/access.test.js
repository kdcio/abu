import access from '../../src/access';

describe('Get Access', () => {
  it('should get access', () => {
    delete process.env.DDB_ENDPOINT;
    const res = access();
    expect(res.DocumentClient.service.config.endpoint).toBe(
      'dynamodb.localhost.amazonaws.com'
    );
  });
});
