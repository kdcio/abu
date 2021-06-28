import CognitoIdentityServiceProvider from "aws-sdk/clients/cognitoidentityserviceprovider";

Cypress.Commands.add("deleteCognitoUser", async (email) => {
  const cognito = new CognitoIdentityServiceProvider({
    accessKeyId: Cypress.env("awsAccessKeyId"),
    secretAccessKey: Cypress.env("awsSecretAccessKey"),
    region: Cypress.env("cognitoRegion"),
  });

  try {
    await cognito
      .adminDeleteUser({
        UserPoolId: Cypress.env("cognitoPoolId"),
        Username: email,
      })
      .promise();
  } catch (error) {
    console.log(error);
  }
});
