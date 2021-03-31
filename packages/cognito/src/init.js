import CognitoIdentityServiceProvider from 'aws-sdk/clients/cognitoidentityserviceprovider';

const init = () => {
  const params = {
    accessKeyId:
      process?.env?.COG_ACCESS_KEY_ID || process?.env?.AWS_ACCESS_KEY_ID,
    secretAccessKey:
      process?.env?.COG_SECRET_ACCESS_KEY ||
      process?.env?.AWS_SECRET_ACCESS_KEY,
    region: process?.env?.COG_REGION || process?.env?.AWS_REGION,
  };

  return new CognitoIdentityServiceProvider(params);
};

export default init;
