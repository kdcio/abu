import init from './init';

const read = async ({ email }) => {
  const cognito = init();

  if (!process.env.COG_POOL_ID) throw new Error('Missing Cognito Pool Id');
  if (!email) throw new Error('Missing email');

  await cognito
    .adminGetUser({
      UserPoolId: process.env.COG_POOL_ID,
      Username: email,
    })
    .promise();
};

export default read;
