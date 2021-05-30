import * as cdk from "@aws-cdk/core";
import * as cognito from "@aws-cdk/aws-cognito";
import * as cloudFront from "@aws-cdk/aws-cloudfront";

interface APIStackProps extends cdk.NestedStackProps {
  cf: cloudFront.CloudFrontWebDistribution;
}

export class APIStack extends cdk.NestedStack {
  userPool: cognito.UserPool;
  userPoolClient: cognito.CfnUserPoolClient;

  constructor(scope: cdk.Construct, id: string, props?: APIStackProps) {
    super(scope, id, props);

    // high level construct
    this.userPool = new cognito.UserPool(this, id + "Pool", {
      signInAliases: {
        email: true,
      },
      autoVerify: {
        email: true,
      },
    });

    // any properties that are not part of the high level construct can be added using this method
    const userPoolCfn = this.userPool.node.defaultChild as cognito.CfnUserPool;
    userPoolCfn.userPoolAddOns = { advancedSecurityMode: "ENFORCED" };
    userPoolCfn.schema = [
      {
        name: "given_name",
        attributeDataType: "String",
        mutable: true,
        required: true,
      },
      {
        name: "family_name",
        attributeDataType: "String",
        mutable: true,
        required: true,
      },
    ];
    userPoolCfn.accountRecoverySetting = {
      recoveryMechanisms: [
        {
          name: "verified_email",
          priority: 1,
        },
      ],
    };
    userPoolCfn.usernameAttributes = ["email"];
    userPoolCfn.policies = {
      passwordPolicy: {
        minimumLength: 6,
        requireLowercase: false,
        requireNumbers: true,
        requireSymbols: false,
        requireUppercase: true,
      },
    };

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

    const supportedIdentityProviders = ["COGNITO"];

    let appUrl = `https://${props?.cf.distributionDomainName}`;

    this.userPoolClient = new cognito.CfnUserPoolClient(
      this,
      "CognitoAppClientCDK",
      {
        supportedIdentityProviders: supportedIdentityProviders,
        clientName: "Web",
        allowedOAuthFlowsUserPoolClient: true,
        allowedOAuthFlows: ["implicit"],
        allowedOAuthScopes: ["phone", "email", "openid", "profile"],
        explicitAuthFlows: ["ALLOW_REFRESH_TOKEN_AUTH"],
        preventUserExistenceErrors: "ENABLED",
        generateSecret: false,
        refreshTokenValidity: 1,
        callbackUrLs: [appUrl],
        logoutUrLs: [appUrl],
        userPoolId: this.userPool.userPoolId,
      }
    );

    // we want to make sure we do things in the right order
    // if (cognitoIdp) {
    //   cfnUserPoolClient.node.addDependency(cognitoIdp);
    // }
  }
}
