import * as cdk from "@aws-cdk/core";
import * as dynamodb from "@aws-cdk/aws-dynamodb";
import schema from "./schema.json";

export class DBStack extends cdk.NestedStack {
  public readonly ddb: dynamodb.Table;

  constructor(scope: cdk.Construct, id: string, props?: cdk.NestedStackProps) {
    super(scope, id, props);

    this.ddb = new dynamodb.Table(this, `${id}-DDB`, {
      tableName: schema.TableName,
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      stream: dynamodb.StreamViewType.NEW_AND_OLD_IMAGES,
      partitionKey: {
        name: "pk",
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: {
        name: "sk",
        type: dynamodb.AttributeType.STRING,
      },
      // removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    this.ddb.addGlobalSecondaryIndex({
      indexName: "GSI",
      partitionKey: {
        name: "pk2",
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: {
        name: "sk2",
        type: dynamodb.AttributeType.STRING,
      },
      projectionType: dynamodb.ProjectionType.ALL,
    });

    this.ddb.addGlobalSecondaryIndex({
      indexName: "GSI2",
      partitionKey: {
        name: "pk3",
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: {
        name: "sk3",
        type: dynamodb.AttributeType.STRING,
      },
      projectionType: dynamodb.ProjectionType.ALL,
    });
  }
}
