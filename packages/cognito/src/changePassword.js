import init from './init';

const changePassword = async ({ email, password }) => {
  const cognito = init();

  if (!process.env.COG_POOL_ID) throw new Error('Missing Cognito Pool Id');
  if (!email) throw new Error('Missing email');
  if (!password) throw new Error('Missing new password');

  await cognito
    .adminSetUserPassword({
      UserPoolId: process.env.COG_POOL_ID,
      Username: email,
      Password: password,
      Permanent: true,
    })
    .promise();
};

export default changePassword;
