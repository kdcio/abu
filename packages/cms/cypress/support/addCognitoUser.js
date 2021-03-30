import CognitoIdentityServiceProvider from "aws-sdk/clients/cognitoidentityserviceprovider";

Cypress.Commands.add("addCognitoUser", async (email, group = "editor") => {
  const cognito = new CognitoIdentityServiceProvider({
    accessKeyId: Cypress.env("awsAccessKeyId"),
    secretAccessKey: Cypress.env("awsSecretAccessKey"),
    region: Cypress.env("cognitoRegion"),
  });

  await cognito
    .adminCreateUser({
      UserPoolId: Cypress.env("cognitoPoolId"),
      Username: email,
    })
    .promise();

  await cognito
    .adminAddUserToGroup({
      UserPoolId: Cypress.env("cognitoPoolId"),
      Username: email,
      GroupName: group,
    })
    .promise();
});
