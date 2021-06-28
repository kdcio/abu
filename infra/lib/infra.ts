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
    const rootId = `${id}-${ABU_STAGE}`;
    super(scope, rootId, props);
    const isLocal = ABU_STAGE === "local";

    let appUrl = "http://localhost:8060";
    if (!isLocal) {
      this.cms = new CMSStack(this, `${rootId}-CMS`);
      const { cf } = this.cms;
      appUrl = `https://${cf.distributionDomainName}`;
      this.db = new DBStack(this, `${rootId}-DB`);
    }
    this.cog = new CogStack(this, `${rootId}-COG`, { appUrl });

    try {
      if (!isLocal) {
        // Final CloudFront URL
        new cdk.CfnOutput(this, `CF_URL_${ABU_STAGE}`, {
          value: this.cms.cf.distributionDomainName,
        });
        new cdk.CfnOutput(this, `CF_ID_${ABU_STAGE}`, {
          value: this.cms.cf.distributionId,
        });
      }

      const { userPool, userPoolClient, userPoolDomain, cogAccess } = this.cog;
      new cdk.CfnOutput(this, `COG_POOL_ID_${ABU_STAGE}`, {
        value: userPool.userPoolId,
      });
      new cdk.CfnOutput(this, `COG_POOL_ARN_${ABU_STAGE}`, {
        value: userPool.userPoolArn,
      });
      new cdk.CfnOutput(this, `COG_POOL_CLIENT_ID_${ABU_STAGE}`, {
        value: userPoolClient.userPoolClientId,
      });
      new cdk.CfnOutput(this, `COG_POOL_CLIENT_DOMAIN_${ABU_STAGE}`, {
        value: userPoolDomain.domainName,
      });
      new cdk.CfnOutput(this, `COG_ACCESS_KEY_ID_${ABU_STAGE}`, {
        value: cogAccess.ref,
      });
      new cdk.CfnOutput(this, `COG_SECRET_ACCESS_KEY_${ABU_STAGE}`, {
        value: cogAccess.attrSecretAccessKey,
      });
    } catch (error) {}
  }
}
