import * as cdk from "@aws-cdk/core";
import { CMSStack } from "./cms";
import { APIStack } from "./api";
import { DDBStack } from "./db";

export class InfraStack extends cdk.Stack {
  cms: CMSStack;
  api: APIStack;
  db: DDBStack;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.cms = new CMSStack(this, "CMS");
    const { cf } = this.cms;
    this.api = new APIStack(this, "API", { cf });
    this.db = new DDBStack(this, "DDB");

    // Final CloudFront URL
    new cdk.CfnOutput(this, "Abu CMS URL", {
      value: cf.distributionDomainName,
    });
  }
}
