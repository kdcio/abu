import { start, makeFakeEvent, genModel } from "helper";
import { handler as create } from "../../src/create";
import { handler as get } from "../../src/get";
import { handler as list } from "../../src/list";
import { handler as update } from "../../src/update";
import { handler as remove } from "../../src/remove";
import faker from "faker";

let ddb;
let tableName;
const models = [];

describe("Model", () => {
  beforeAll(async () => {
    ({ DocumentClient: ddb, TableName: tableName } = await start());
  });

  [
    { model: genModel() },
    { model: genModel() },
    { model: genModel() },
    { model: genModel() },
    { model: genModel() },
    { model: genModel() },
    { model: genModel() },
    { model: genModel() },
    { model: genModel() },
    { model: genModel() },
  ].forEach(({ model }) => {
    it(`should create model`, async () => {
      const event = makeFakeEvent({
        requestContext: { authorizer: { claims: { sub: "tester" } } },
        path: "/",
        headers: { "Content-Type": "application/json" },
        httpMethod: "POST",
        body: JSON.stringify(model),
      });

      const response = await create(event);
      expect(response.statusCode).toEqual(201);
      expect(response.isBase64Encoded).toBe(false);
      const json = JSON.parse(response.body);
      expect(json).toHaveProperty("id");

      const params = {
        TableName: tableName,
        Key: {
          pk: `MOD#${model.id}`,
          sk: "META",
        },
      };

      const { Item } = await ddb.get(params).promise();
      expect(Item.sk2).toBe(model.name);
      expect(Item.collection).toBe(model.collection);
      expect(Item.fields).toEqual(model.fields);

      models.push({ ...model });
    });
  });

  // it(`should not create model if user is not allowed in business`, async () => {
  //   const userId = "3";
  //   const busId = "1";
  //   const cus = genModel();
  //   const event = makeFakeEvent({
  //     requestContext: { authorizer: { claims: { sub: userId } } },
  //     path: '/',
  //     pathParameters: { busId },
  //     headers: { "Content-Type": "application/json" },
  //     httpMethod: "POST",
  //     body: JSON.stringify(cus),
  //   });

  //   const response = await create(event);
  //   expect(response.statusCode).toEqual(403);
  //   expect(response.isBase64Encoded).toBe(false);
  // });

  it(`should get model`, async () => {
    const model = models[faker.datatype.number({ max: models.length - 1 })];
    const event = makeFakeEvent({
      requestContext: { authorizer: { claims: { sub: "tester" } } },
      path: `/${model.id}`,
      pathParameters: { id: model.id },
      headers: { "Content-Type": "application/json" },
      httpMethod: "GET",
    });

    const response = await get(event);
    expect(response.statusCode).toEqual(200);
    expect(response.isBase64Encoded).toBe(false);

    const json = JSON.parse(response.body);
    expect(json.id).toBe(model.id);
    expect(json.name).toBe(model.name);
    expect(json.collection).toBe(model.collection);
    expect(json.fields).toEqual(model.fields);
  });

  // it(`should not get model if user is not allowed to business`, async () => {
  //   const userId = "1";
  //   const busId = "2";
  //   const cus = userCus["2"][0];
  //   const event = makeFakeEvent({
  //     requestContext: { authorizer: { claims: { sub: userId } } },
  //     path: `/${model.id}`,
  //     pathParameters: { id: model.id },
  //     headers: { "Content-Type": "application/json" },
  //     httpMethod: "GET",
  //   });

  //   const response = await get(event);
  //   expect(response.statusCode).toEqual(403);
  //   expect(response.isBase64Encoded).toBe(false);
  // });

  it(`should return 404 for invalid model`, async () => {
    const id = "invalid-434534";
    const event = makeFakeEvent({
      requestContext: { authorizer: { claims: { sub: "tester" } } },
      path: `/${id}`,
      pathParameters: { id },
      headers: { "Content-Type": "application/json" },
      httpMethod: "GET",
    });

    const response = await get(event);
    expect(response.statusCode).toEqual(404);
    expect(response.isBase64Encoded).toBe(false);
  });

  it(`should list models`, async () => {
    const event = makeFakeEvent({
      requestContext: { authorizer: { claims: { sub: "tester" } } },
      path: "/",
      headers: { "Content-Type": "application/json" },
      httpMethod: "GET",
    });

    const response = await list(event);
    expect(response.statusCode).toEqual(200);
    expect(response.isBase64Encoded).toBe(false);

    const json = JSON.parse(response.body);
    expect(json.Count).toBe(models.length);
  });

  // it(`should not list models if user is not allowed in business`, async () => {
  //   const userId = "1";
  //   const busId = "3";
  //   const event = makeFakeEvent({
  //     requestContext: { authorizer: { claims: { sub: userId } } },
  //     path: "/",
  //     headers: { "Content-Type": "application/json" },
  //     httpMethod: "GET",
  //   });

  //   const response = await list(event);
  //   expect(response.statusCode).toEqual(403);
  //   expect(response.isBase64Encoded).toBe(false);
  // });

  it(`should update model`, async () => {
    const model = models[faker.datatype.number({ max: models.length - 1 })];
    const newName = `${model.name} updated`;
    const event = makeFakeEvent({
      requestContext: { authorizer: { claims: { sub: "tester" } } },
      path: `/${model.id}`,
      pathParameters: { id: model.id },
      headers: { "Content-Type": "application/json" },
      httpMethod: "PATCH",
      body: JSON.stringify({
        ...model,
        name: newName,
      }),
    });

    const response = await update(event);
    expect(response.statusCode).toEqual(204);
    expect(response.isBase64Encoded).toBe(false);

    const params = {
      TableName: tableName,
      Key: {
        pk: `MOD#${model.id}`,
        sk: `META`,
      },
    };

    const { Item } = await ddb.get(params).promise();
    expect(Item.sk2).toBe(newName);
    expect(Item.collection).toBe(model.collection);
    expect(Item.fields).toEqual(model.fields);
  });

  // it(`should not update model if user is not allowed in business`, async () => {
  //   const userId = "2";
  //   const busId = "3";
  //   const cus = userCus[userId][0];
  //   const newName = `${cus.cusName} updated`;
  //   const event = makeFakeEvent({
  //     requestContext: { authorizer: { claims: { sub: userId } } },
  //     path: `/${model.id}`,
  //     pathParameters: { id: model.id },
  //     headers: { "Content-Type": "application/json" },
  //     httpMethod: "PATCH",
  //     body: JSON.stringify({
  //       ...cus,
  //       cusName: newName,
  //     }),
  //   });

  //   const response = await update(event);
  //   expect(response.statusCode).toEqual(403);
  //   expect(response.isBase64Encoded).toBe(false);
  // });

  it(`should delete model`, async () => {
    const model = models[faker.datatype.number({ max: models.length - 1 })];
    const event = makeFakeEvent({
      requestContext: { authorizer: { claims: { sub: "tester" } } },
      path: `/${model.id}`,
      pathParameters: { id: model.id },
      headers: { "Content-Type": "application/json" },
      httpMethod: "DELETE",
    });

    const response = await remove(event);
    expect(response.statusCode).toEqual(204);
    expect(response.isBase64Encoded).toBe(false);

    const params = {
      TableName: tableName,
      Key: {
        pk: `MOD#${model.id}`,
        sk: "META",
      },
    };

    const res = await ddb.get(params).promise();
    expect(res).not.toHaveProperty("Item");
  });

  // it(`should not delete model if user is not allowed to business`, async () => {
  //   const userId = "3";
  //   const busId = "2";
  //   const cus = userCus["2"][0];
  //   const event = makeFakeEvent({
  //     requestContext: { authorizer: { claims: { sub: userId } } },
  //     path: `/${model.id}`,
  //     pathParameters: { id: model.id },
  //     headers: { "Content-Type": "application/json" },
  //     httpMethod: "DELETE",
  //   });

  //   const response = await remove(event);
  //   expect(response.statusCode).toEqual(403);
  //   expect(response.isBase64Encoded).toBe(false);

  //   const params = {
  //     TableName: tableName,
  //     Key: {
  //       pk: `BUS#${busId}`,
  //       sk: "META",
  //     },
  //   };

  //   const res = await ddb.get(params).promise();
  //   expect(res).toHaveProperty("Item");
  // });
});
