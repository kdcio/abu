const Auth = {
  // REQUIRED - Amazon Cognito Region
  region: process.env.REACT_APP_AUTH_AWS_REGION,

  // OPTIONAL - Amazon Cognito User Pool ID
  userPoolId: process.env.REACT_APP_AUTH_POOL_ID,

  // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
  userPoolWebClientId: process.env.REACT_APP_AUTH_CLIENT_ID,

  // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
  mandatorySignIn: true,

  // OPTIONAL - Hosted UI configuration
  oauth: {
    domain: process.env.REACT_APP_AUTH_OAUTH_DOMAIN,
    scope: [
      "phone",
      "email",
      "profile",
      "openid",
      "aws.cognito.signin.user.admin",
    ],
    redirectSignIn: process.env.REACT_APP_AUTH_OAUTH_SIGNIN,
    redirectSignOut: process.env.REACT_APP_AUTH_OAUTH_SIGNOUT,
    responseType: "code", // or 'token', note that REFRESH token will only be generated when the responseType is code
  },
};

export default Auth;
