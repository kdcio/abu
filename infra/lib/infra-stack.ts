import * as cdk from "@aws-cdk/core";
import * as s3 from "@aws-cdk/aws-s3";
import * as iam from "@aws-cdk/aws-iam";
// import * as s3deploy from "@aws-cdk/aws-s3-deployment";
import * as cloudFront from "@aws-cdk/aws-cloudfront";

export class InfraStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Add S3 Bucket
    const webappBucket = new s3.Bucket(this, `AbuCMSS3`, {
      bucketName: `abu-cms-cdk-s3bucket`,
    });

    const cloudFrontOAI = new cloudFront.OriginAccessIdentity(this, "OAI", {
      comment: "OAI for Abu CMS.",
    });

    const cloudfrontS3Access = new iam.PolicyStatement();
    cloudfrontS3Access.addActions("s3:GetBucket*");
    cloudfrontS3Access.addActions("s3:GetObject*");
    cloudfrontS3Access.addActions("s3:List*");
    cloudfrontS3Access.addResources(webappBucket.bucketArn);
    cloudfrontS3Access.addResources(`${webappBucket.bucketArn}/*`);
    cloudfrontS3Access.addCanonicalUserPrincipal(
      cloudFrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId
    );

    webappBucket.addToResourcePolicy(cloudfrontS3Access);

    // Create a new CloudFront Distribution
    const distribution = new cloudFront.CloudFrontWebDistribution(
      this,
      `abu-cms-cdk-cf-distribution`,
      {
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: webappBucket,
              originAccessIdentity: cloudFrontOAI,
            },
            behaviors: [
              {
                isDefaultBehavior: true,
                compress: true,
              },
            ],
          },
        ],
        errorConfigurations: [
          {
            errorCode: 403,
            responseCode: 200,
            responsePagePath: "/index.html",
            errorCachingMinTtl: 0,
          },
          {
            errorCode: 404,
            responseCode: 200,
            responsePagePath: "/index.html",
            errorCachingMinTtl: 0,
          },
        ],
        comment: `abu-cms CDK - CloudFront Distribution`,
        viewerProtocolPolicy: cloudFront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      }
    );

    // Setup Bucket Deployment to automatically deploy new assets and invalidate cache
    // new s3deploy.BucketDeployment(this, `abu-cms-cdk-s3bucketdeployment`, {
    //   sources: [s3deploy.Source.asset("../build")],
    //   destinationBucket: s3Site,
    //   distribution: distribution,
    //   distributionPaths: ["/*"],
    // });

    // Final CloudFront URL
    new cdk.CfnOutput(this, "CloudFront URL", {
      value: distribution.distributionDomainName,
    });
  }
}
