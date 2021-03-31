import init from './init';

const list = async () => {
  const cognito = init();

  if (!process.env.COG_POOL_ID) throw new Error('Missing Cognito Pool Id');

  await cognito
    .listUsers({
      UserPoolId: process.env.COG_POOL_ID,
    })
    .promise();
};

export default list;
