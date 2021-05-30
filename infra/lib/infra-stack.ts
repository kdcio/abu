import * as cdk from "@aws-cdk/core";
import { CMSStack } from "./cms";
import { APIStack } from "./api";

export class InfraStack extends cdk.Stack {
  cms: CMSStack;
  api: APIStack;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.cms = new CMSStack(this, "CMS");
    this.api = new APIStack(this, "API");
  }
}
