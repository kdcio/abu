import * as cdk from "@aws-cdk/core";
import { CMSStack } from "./cms";
import { APIStack } from "./api";
import { DBStack } from "./db";

export class InfraStack extends cdk.Stack {
  cms: CMSStack;
  api: APIStack;
  db: DBStack;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    const { ABU_STAGE } = process.env;
    super(scope, `${id}-${ABU_STAGE}`, props);

    this.cms = new CMSStack(this, `${id}-CMS`);
    const { cf } = this.cms;
    this.api = new APIStack(this, `${id}-API`, { cf });
    this.db = new DBStack(this, `${id}-DB`);

    // Final CloudFront URL
    new cdk.CfnOutput(this, "Abu CMS URL", {
      value: cf.distributionDomainName,
    });
  }
}
