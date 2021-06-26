import * as cdk from "@aws-cdk/core";
import { CMSStack } from "./cms";
import { CogStack } from "./cognito";
import { DBStack } from "./db";

export class InfraStack extends cdk.Stack {
  cms: CMSStack;
  cog: CogStack;
  db: DBStack;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    const { ABU_STAGE } = process.env;
    super(scope, `${id}-${ABU_STAGE}`, props);

    this.cms = new CMSStack(this, `${id}-CMS`);
    const { cf } = this.cms;
    this.cog = new CogStack(this, `${id}-COG`, { cf });
    this.db = new DBStack(this, `${id}-DB`);

    // Final CloudFront URL
    new cdk.CfnOutput(this, "CF_URL", {
      value: cf.distributionDomainName,
    });
    new cdk.CfnOutput(this, "CF_ID", {
      value: cf.distributionId,
    });

    const { userPool, userPoolClient, userPoolDomain, cogAccess } = this.cog;
    new cdk.CfnOutput(this, "COG_POOL_ID", {
      value: userPool.userPoolId,
    });
    new cdk.CfnOutput(this, "COG_POOL_ARN", {
      value: userPool.userPoolArn,
    });
    new cdk.CfnOutput(this, "COG_POOL_CLIENT_ID", {
      value: userPoolClient.userPoolClientId,
    });
    new cdk.CfnOutput(this, "COG_POOL_CLIENT_DOMAIN", {
      value: userPoolDomain.domainName,
    });
    new cdk.CfnOutput(this, "COG_ACCESS_KEY_ID", {
      value: cogAccess.ref,
    });
    new cdk.CfnOutput(this, "COG_SECRET_ACCESS_KEY", {
      value: cogAccess.attrSecretAccessKey,
    });
  }
}
