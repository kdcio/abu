import init from './init';

const create = async ({ email, group = 'editor' }) => {
  const cognito = init();

  if (!process.env.COG_POOL_ID) throw new Error('Missing Cognito Pool Id');
  if (!email) throw new Error('Missing email');

  await cognito
    .adminCreateUser({
      UserPoolId: process.env.COG_POOL_ID,
      Username: email,
    })
    .promise();

  await cognito
    .adminAddUserToGroup({
      UserPoolId: process.env.COG_POOL_ID,
      Username: email,
      GroupName: group,
    })
    .promise();
};

export default create;
