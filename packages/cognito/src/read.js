import init from './init';

const read = async ({ email }) => {
  const cognito = init();

  if (!process.env.COG_POOL_ID) throw new Error('Missing Cognito Pool Id');
  if (!email) throw new Error('Missing email');

  const data = await cognito
    .adminGetUser({
      UserPoolId: process.env.COG_POOL_ID,
      Username: email,
    })
    .promise();

  const groups = await cognito
    .adminListGroupsForUser({
      UserPoolId: process.env.COG_POOL_ID,
      Username: email,
    })
    .promise();

  return {
    created: data.UserCreateDate,
    updated: data.UserLastModifiedDate,
    statues: data.UserStatus,
    username: data.Username,
    ...data.UserAttributes.reduce((acc, attr) => {
      acc[attr.Name] = attr.Value;
      return acc;
    }, {}),
    groups: groups?.Groups.map((g) => g.GroupName),
  };
};

export default read;
