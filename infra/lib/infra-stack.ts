import * as cdk from "@aws-cdk/core";
import { CMSStack } from "./cms";

export class InfraStack extends cdk.Stack {
  cms: CMSStack;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.cms = new CMSStack(this, "CMS");
  }
}
