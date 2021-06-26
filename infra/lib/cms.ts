import * as cdk from "@aws-cdk/core";
import * as s3 from "@aws-cdk/aws-s3";
import * as iam from "@aws-cdk/aws-iam";
import * as cloudFront from "@aws-cdk/aws-cloudfront";

export class CMSStack extends cdk.NestedStack {
  bucket: s3.Bucket;
  cf: cloudFront.CloudFrontWebDistribution;

  constructor(scope: cdk.Construct, id: string, props?: cdk.NestedStackProps) {
    super(scope, id, props);

    this.bucket = new s3.Bucket(this, `${id}-S3`, {
      bucketName: process.env.PROJECT,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const cloudFrontOAI = new cloudFront.OriginAccessIdentity(
      this,
      `${id}-CF-OAI`,
      {
        comment: "Origin Access Identity",
      }
    );

    const cloudfrontS3Access = new iam.PolicyStatement();
    cloudfrontS3Access.addActions("s3:GetBucket*");
    cloudfrontS3Access.addActions("s3:GetObject*");
    cloudfrontS3Access.addActions("s3:List*");
    cloudfrontS3Access.addResources(this.bucket.bucketArn);
    cloudfrontS3Access.addResources(`${this.bucket.bucketArn}/*`);
    cloudfrontS3Access.addCanonicalUserPrincipal(
      cloudFrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId
    );

    this.bucket.addToResourcePolicy(cloudfrontS3Access);

    // Create a new CloudFront Distribution
    this.cf = new cloudFront.CloudFrontWebDistribution(this, `${id}-CF`, {
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: this.bucket,
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
      comment: `${process.env.PROJECT} - CloudFront Distribution`,
      viewerProtocolPolicy: cloudFront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
    });
  }
}
