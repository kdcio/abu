import init from './init';

const setGroup = async ({ email, oldGroup, newGroup }) => {
  const cognito = init();

  if (!process.env.COG_POOL_ID) throw new Error('Missing Cognito Pool Id');
  if (!email) throw new Error('Missing email');
  if (!oldGroup) throw new Error('Missing old group');
  if (!newGroup) throw new Error('Missing new group');

  await cognito
    .adminRemoveUserFromGroup({
      UserPoolId: process.env.COG_POOL_ID,
      Username: email,
      GroupName: oldGroup,
    })
    .promise();

  await cognito
    .adminAddUserToGroup({
      UserPoolId: process.env.COG_POOL_ID,
      Username: email,
      GroupName: newGroup,
    })
    .promise();
};

export default setGroup;
