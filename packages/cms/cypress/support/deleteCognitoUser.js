import CognitoIdentityServiceProvider from "aws-sdk/clients/cognitoidentityserviceprovider";

Cypress.Commands.add("deleteCognitoUser", (email) => {
  const cognito = new CognitoIdentityServiceProvider({
    accessKeyId: Cypress.env("awsAccessKeyId"),
    secretAccessKey: Cypress.env("awsSecretAccessKey"),
    region: Cypress.env("cognitoRegion"),
  });

  return cognito
    .adminDeleteUser({
      UserPoolId: Cypress.env("cognitoPoolId"),
      Username: email,
    })
    .promise();
});
