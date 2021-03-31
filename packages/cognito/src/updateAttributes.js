import init from './init';

const updateAttributes = async ({ email, attributes }) => {
  const cognito = init();

  if (!process.env.COG_POOL_ID) throw new Error('Missing Cognito Pool Id');
  if (!email) throw new Error('Missing email');
  if (!attributes) throw new Error('Missing attributes');
  if (!attributes.firstName) throw new Error('Missing first name');
  if (!attributes.lastName) throw new Error('Missing last name');

  await cognito
    .adminUpdateUserAttributes({
      UserPoolId: process.env.COG_POOL_ID,
      Username: email,
      UserAttributes: [
        {
          Name: 'given_name',
          Value: attributes.firstName,
        },
        {
          Name: 'family_name',
          Value: attributes.lastName,
        },
      ],
    })
    .promise();
};

export default updateAttributes;
