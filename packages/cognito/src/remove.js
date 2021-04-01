import init from './init';

const remove = async ({ email }) => {
  const cognito = init();

  if (!process.env.COG_POOL_ID) throw new Error('Missing Cognito Pool Id');
  if (!email) throw new Error('Missing email');

  await cognito
    .adminDeleteUser({
      UserPoolId: process.env.COG_POOL_ID,
      Username: email,
    })
    .promise();
};

export default remove;
