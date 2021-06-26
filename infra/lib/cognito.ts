import * as cdk from "@aws-cdk/core";
import * as cognito from "@aws-cdk/aws-cognito";
import * as cloudFront from "@aws-cdk/aws-cloudfront";
import * as iam from "@aws-cdk/aws-iam";

interface CogStackProps extends cdk.NestedStackProps {
  cf: cloudFront.CloudFrontWebDistribution;
}

export class CogStack extends cdk.NestedStack {
  userPool: cognito.UserPool;
  userPoolClient: cognito.UserPoolClient;
  userPoolDomain: cognito.UserPoolDomain;
  cogAccess: iam.CfnAccessKey;

  constructor(scope: cdk.Construct, id: string, props?: CogStackProps) {
    super(scope, id, props);

    // high level construct
    this.userPool = new cognito.UserPool(this, `${id}-UserPool`, {
      userPoolName: process.env.PROJECT,
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
      signInAliases: {
        email: true,
      },
      autoVerify: {
        email: true,
      },
      mfa: cognito.Mfa.OFF,
      standardAttributes: {
        givenName: {
          mutable: true,
          required: true,
        },
        familyName: {
          mutable: true,
          required: true,
        },
      },
      passwordPolicy: {
        minLength: 6,
        requireLowercase: false,
        requireDigits: true,
        requireSymbols: false,
        requireUppercase: true,
      },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // create two groups, one for admins one for users
    // these groups can be used without configuring a 3rd party IdP

    // new cognito.CfnUserPoolGroup(this, "AdminsGroup", {
    //   groupName: adminsGroupName,
    //   userPoolId: userPool.userPoolId,
    // });

    // new cognito.CfnUserPoolGroup(this, "UsersGroup", {
    //   groupName: usersGroupName,
    //   userPoolId: userPool.userPoolId,
    // });

    const supportedIdentityProviders = [
      cognito.UserPoolClientIdentityProvider.COGNITO,
    ];

    let appUrl = `https://${props?.cf.distributionDomainName}`;

    this.userPoolClient = new cognito.UserPoolClient(
      this,
      `${id}-UserPool-Client`,
      {
        supportedIdentityProviders: supportedIdentityProviders,
        userPoolClientName: `${process.env.PROJECT}-client`,
        oAuth: {
          flows: {
            implicitCodeGrant: true,
          },
          callbackUrls: [appUrl],
          logoutUrls: [appUrl],
          scopes: [
            cognito.OAuthScope.COGNITO_ADMIN,
            cognito.OAuthScope.PHONE,
            cognito.OAuthScope.EMAIL,
            cognito.OAuthScope.OPENID,
            cognito.OAuthScope.PROFILE,
          ],
        },
        preventUserExistenceErrors: true,
        generateSecret: false,
        refreshTokenValidity: cdk.Duration.days(365),
        userPool: this.userPool,
      }
    );

    const domainPrefix = process?.env?.PROJECT?.replace(/\./g, "-") || "";
    this.userPoolDomain = new cognito.UserPoolDomain(
      this,
      `${id}-UserPool-Domain`,
      {
        userPool: this.userPool,
        cognitoDomain: {
          domainPrefix,
        },
      }
    );

    // we want to make sure we do things in the right order
    if (this.userPool) {
      this.userPoolDomain.node.addDependency(this.userPool);
      this.userPoolClient.node.addDependency(this.userPool);
    }

    const cogAccessPolicy = new iam.PolicyDocument({
      statements: [
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          resources: [this.userPool.userPoolArn],
          actions: [
            "cognito-idp:AdminDeleteUser",
            "cognito-idp:ListUsersInGroup",
            "cognito-idp:ListGroups",
            "cognito-idp:AdminCreateUser",
            "cognito-idp:AdminSetUserPassword",
            "cognito-idp:AdminRemoveUserFromGroup",
            "cognito-idp:AdminAddUserToGroup",
            "cognito-idp:AdminListGroupsForUser",
            "cognito-idp:AdminUpdateUserAttributes",
            "cognito-idp:AdminGetUser",
            "cognito-idp:ListUsers",
          ],
        }),
      ],
    });

    const cognitoAccess = new iam.ManagedPolicy(this, `${id}-CognitoAccess`, {
      description: "Policy for accessing cognito",
      managedPolicyName: `${id}-CognitoAccess`,
      document: cogAccessPolicy,
    });

    const user = new iam.User(this, `${id}-User`, {
      userName: `${id}-user`,
      managedPolicies: [cognitoAccess],
    });

    this.cogAccess = new iam.CfnAccessKey(this, `${id}-CogAccess`, {
      userName: user.userName,
    });
  }
}
