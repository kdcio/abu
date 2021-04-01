import init from './init';

const list = async () => {
  const cognito = init();

  if (!process.env.COG_POOL_ID) throw new Error('Missing Cognito Pool Id');

  const proms = [];
  proms.push(
    cognito
      .listUsersInGroup({
        UserPoolId: process.env.COG_POOL_ID,
        GroupName: 'admin',
      })
      .promise()
  );
  proms.push(
    cognito
      .listUsersInGroup({
        UserPoolId: process.env.COG_POOL_ID,
        GroupName: 'editor',
      })
      .promise()
  );
  const [admins, editors] = await Promise.all(proms);

  const attrReducer = (acc, attr) => {
    acc[attr.Name] = attr.Value;
    return acc;
  };

  const userMap = (u) => ({
    created: u.UserCreateDate,
    updated: u.UserLastModifiedDate,
    statues: u.UserStatus,
    username: u.Username,
    ...u.Attributes.reduce(attrReducer, {}),
  });

  const userMapAdmin = (u) => ({
    ...userMap(u),
    groups: ['admin'],
  });

  const userMapEditor = (u) => ({
    ...userMap(u),
    groups: ['editor'],
  });

  return [
    ...admins.Users.map(userMapAdmin),
    ...editors.Users.map(userMapEditor),
  ].sort((a, b) => (a.created > b.created ? -1 : 1));
};

export default list;
