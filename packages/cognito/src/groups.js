import init from './init';

const groups = async ({ email }) => {
  const cognito = init();

  if (!process.env.COG_POOL_ID) throw new Error('Missing Cognito Pool Id');
  if (!email) throw new Error('Missing email');

  const data = await cognito
    .adminListGroupsForUser({
      UserPoolId: process.env.COG_POOL_ID,
      Username: email,
    })
    .promise();

  return data?.Groups.map((g) => g.GroupName);
};

export default groups;
