import { start, makeFakeEvent } from "helper";
import { handler as create } from "../../src/create";
import { handler as read } from "../../src/read";
import { handler as list } from "../../src/list";
import { handler as update } from "../../src/update";
import { handler as remove } from "../../src/delete";
import apiAccesses from "../fixtures/api-access.json";

let ddb;
let tableName;
const accesses = [];

describe("Access", () => {
  beforeAll(async () => {
    ({ DocumentClient: ddb, TableName: tableName } = await start());
  });

  apiAccesses.forEach((access) => {
    it(`should create access ${access.name}`, async () => {
      const event = makeFakeEvent({
        path: "/",
        headers: { "Content-Type": "application/json" },
        httpMethod: "POST",
        body: JSON.stringify(access),
      });

      const response = await create(event);
      expect(response.statusCode).toEqual(201);
      expect(response.isBase64Encoded).toBe(false);
      const json = JSON.parse(response.body);
      expect(json).toHaveProperty("id");

      const params = {
        TableName: tableName,
        Key: {
          pk: `API#${json.id}`,
          sk: "META",
        },
      };

      const { Item } = await ddb.get(params).promise();
      expect(Item.sk2).toBe(access.name);
      expect(Item.read).toEqual(access.read);
      expect(Item.write).toEqual(access.write);
      expect(Item).toHaveProperty("pk3");

      accesses.push({ ...access, id: json.id });
    });
  });

  it("should list access with pagination", async () => {
    let event = makeFakeEvent({
      path: "/",
      headers: { "Content-Type": "application/json" },
      queryStringParameters: { limit: 3 },
      httpMethod: "GET",
    });

    let response = await list(event);
    expect(response.statusCode).toEqual(200);
    expect(response.isBase64Encoded).toBe(false);
    let json = JSON.parse(response.body);
    expect(json).toHaveProperty("cursor");
    expect(json.Items).toHaveLength(3);

    // second page
    event = makeFakeEvent({
      path: "/",
      pathParameters: { modelId: "blog" },
      queryStringParameters: { limit: 3, cursor: json.cursor },
      headers: { "Content-Type": "application/json" },
      httpMethod: "GET",
    });

    response = await list(event);
    expect(response.statusCode).toEqual(200);
    expect(response.isBase64Encoded).toBe(false);
    json = JSON.parse(response.body);
    expect(json).toHaveProperty("cursor");
    expect(json.Items).toHaveLength(2);
  });

  it("should list access with default limit of 10", async () => {
    const event = makeFakeEvent({
      path: "/",
      headers: { "Content-Type": "application/json" },
      httpMethod: "GET",
    });

    const response = await list(event);
    expect(response.statusCode).toEqual(200);
    expect(response.isBase64Encoded).toBe(false);
    const json = JSON.parse(response.body);
    expect(json).toHaveProperty("cursor");
    expect(json.Items).toHaveLength(5);
  });

  it("should read aaccess", async () => {
    const access = accesses[4];
    const event = makeFakeEvent({
      path: "/",
      pathParameters: { id: access.id },
      queryStringParameters: { all: "true" },
      headers: { "Content-Type": "application/json" },
      httpMethod: "GET",
    });

    const response = await read(event);
    expect(response.statusCode).toEqual(200);
    expect(response.isBase64Encoded).toBe(false);

    const json = JSON.parse(response.body);
    expect(json.id).toBe(access.id);
    expect(json.name).toBe(access.name);
    expect(json.read).toEqual(access.read);
    expect(json.write).toEqual(access.write);
    expect(json).toHaveProperty("key");
    expect(json).toHaveProperty("created");
    expect(json).toHaveProperty("modified");
    expect(json).not.toHaveProperty("pk");
    expect(json).not.toHaveProperty("pk2");
    expect(json).not.toHaveProperty("pk3");
    expect(json).not.toHaveProperty("sk");
    expect(json).not.toHaveProperty("sk2");
    expect(json).not.toHaveProperty("entity");

    accesses[4].key = json.key;
  });

  it("should be able to use key", async () => {
    const access = accesses[4];
    const params = {
      TableName: tableName,
      IndexName: "GSI2",
      KeyConditionExpression: "pk3 = :key",
      ExpressionAttributeValues: {
        ":key": `KEY#${access.key}`,
      },
    };

    const { Items, Count } = await ddb.query(params).promise();
    const [data] = Items;
    expect(Count).toBe(1);
    expect(data.sk2).toBe(access.name);
    expect(data.read).toEqual(access.read);
    expect(data.write).toEqual(access.write);
  });

  it("should throw content not found", async () => {
    const event = makeFakeEvent({
      path: "/",
      pathParameters: { id: "fake-id" },
      headers: { "Content-Type": "application/json" },
      httpMethod: "GET",
    });

    const response = await read(event);
    expect(response.statusCode).toEqual(404);
    expect(response.isBase64Encoded).toBe(false);

    const json = JSON.parse(response.body);
    expect(json.message).toBe("API not found");
  });

  it("should delete access", async () => {
    const access = accesses[1];
    const event = makeFakeEvent({
      path: "/",
      pathParameters: { id: access.id },
      headers: { "Content-Type": "application/json" },
      httpMethod: "DELETE",
    });

    const response = await remove(event);
    expect(response.statusCode).toEqual(204);
    expect(response.isBase64Encoded).toBe(false);

    const params = {
      TableName: tableName,
      Key: {
        pk: `API#${access.id}`,
        sk: "META",
      },
    };

    const res = await ddb.get(params).promise();
    expect(res).not.toHaveProperty("Item");
  });

  it("should update access", async () => {
    const access = accesses[0];
    const { id } = access;
    const event = makeFakeEvent({
      path: "/",
      pathParameters: { id },
      headers: { "Content-Type": "application/json" },
      httpMethod: "PUT",
      body: JSON.stringify({ name: "Edited access" }),
    });

    const response = await update(event);
    expect(response.statusCode).toEqual(204);
    expect(response.isBase64Encoded).toBe(false);

    const params = {
      TableName: tableName,
      Key: {
        pk: `API#${id}`,
        sk: "META",
      },
    };

    const res = await ddb.get(params).promise();
    expect(res.Item.sk2).toEqual("Edited access");
  });
});
