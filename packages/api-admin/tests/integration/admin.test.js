import { start, makeFakeEvent } from "helper";
import { handler as seed } from "../../src/seed";
import { handler as reset } from "../../src/reset";

jest.setTimeout(20000);

let ddb;
let tableName;

describe("Seed", () => {
  beforeAll(async () => {
    ({ DocumentClient: ddb, TableName: tableName } = await start());
  });

  it("should seed model, content and api access", async () => {
    const event = makeFakeEvent({
      path: "/seed",
      headers: { "Content-Type": "application/json" },
      httpMethod: "POST",
    });

    const response = await seed(event);
    expect(response.statusCode).toEqual(201);
    expect(response.isBase64Encoded).toBe(false);

    // seed model
    const params = {
      TableName: tableName,
      IndexName: "GSI",
      KeyConditionExpression: "pk2 = :key",
      ExpressionAttributeValues: {
        ":key": "MOD",
      },
    };

    let { Count } = await ddb.query(params).promise();
    expect(Count).toBe(4);

    // seed api acccess
    params.ExpressionAttributeValues = { ":key": "API" };
    ({ Count } = await ddb.query(params).promise());
    expect(Count).toBe(5);

    // seed content
    params.ExpressionAttributeValues = { ":key": "MOD#about_page#CON" };
    ({ Count } = await ddb.query(params).promise());
    expect(Count).toBe(1);
    params.ExpressionAttributeValues = { ":key": "MOD#home_page#CON" };
    ({ Count } = await ddb.query(params).promise());
    expect(Count).toBe(1);
    params.ExpressionAttributeValues = { ":key": "MOD#blog#CON" };
    ({ Count } = await ddb.query(params).promise());
    expect(Count).toBe(3);
    params.ExpressionAttributeValues = { ":key": "MOD#social_profile#CON" };
    ({ Count } = await ddb.query(params).promise());
    expect(Count).toBe(3);
  });

  it("should delete all data", async () => {
    const params = {
      TableName: tableName,
    };

    let { Items } = await ddb.scan(params).promise();
    expect(Items.length).toBeGreaterThan(0);

    const event = makeFakeEvent({
      path: "/reset",
      headers: { "Content-Type": "application/json" },
      httpMethod: "DELETE",
    });

    const response = await reset(event);
    expect(response.statusCode).toEqual(204);
    expect(response.isBase64Encoded).toBe(false);

    ({ Items } = await ddb.scan(params).promise());
    expect(Items.length).toBe(0);
  });
});
