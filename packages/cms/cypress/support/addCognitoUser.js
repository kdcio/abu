import CognitoIdentityServiceProvider from "aws-sdk/clients/cognitoidentityserviceprovider";

Cypress.Commands.add("addCognitoUser", (email) => {
  const cognito = new CognitoIdentityServiceProvider({
    accessKeyId: Cypress.env("awsAccessKeyId"),
    secretAccessKey: Cypress.env("awsSecretAccessKey"),
    region: Cypress.env("cognitoRegion"),
  });

  return cognito
    .adminCreateUser({
      UserPoolId: Cypress.env("cognitoPoolId"),
      Username: email,
    })
    .promise();
});
