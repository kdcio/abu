import {
  start,
  makeFakeEvent,
  genBlog,
  genAbout,
  genHome,
  genSocial,
} from "helper";
import ApiAccess from "model/lib/entities/ApiAccess";
import Model from "model/lib/entities/Model";
import { handler as create } from "../../src/create";
import { handler as list } from "../../src/list";
import { handler as read } from "../../src/read";
import { handler as remove } from "../../src/delete";
import { handler as update } from "../../src/update";
import { handler as authorizer } from "../../src/authorizer";
import { handler as hello } from "../../src/hello";

import apiAccesses from "../fixtures/api-access.json";
import models from "../fixtures/models.json";

let ddb;
let tableName;
const contents = {
  about_page: [],
  blog: [],
  home: [],
  social_profile: [],
};

describe("Content", () => {
  beforeAll(async () => {
    ({ DocumentClient: ddb, TableName: tableName } = await start());
    const proms = [];
    apiAccesses.forEach((d) => {
      proms.push(ApiAccess.put({ ...d }));
    });
    models.forEach((d) => {
      proms.push(Model.put({ ...d }));
    });
    await Promise.all(proms);
  });

  [
    { content: genBlog(), modelId: "blog" },
    { content: genBlog(), modelId: "blog" },
    { content: genAbout(), modelId: "about_page" },
    { content: genBlog(), modelId: "blog" },
    { content: genBlog(), modelId: "blog" },
    { content: genSocial(), modelId: "social_profile" },
    { content: genBlog(), modelId: "blog" },
    { content: genHome(), modelId: "home" },
    { content: genSocial(), modelId: "social_profile" },
    { content: genBlog(), modelId: "blog" },
    { content: genBlog(), modelId: "blog" },
    { content: genSocial(), modelId: "social_profile" },
    { content: genBlog(), modelId: "blog" },
    { content: genBlog(), modelId: "blog" },
    { content: genBlog(), modelId: "blog" },
    { content: genSocial(), modelId: "social_profile" },
    { content: genBlog(), modelId: "blog" },
    { content: genBlog(), modelId: "blog" },
    { content: genBlog(), modelId: "blog" },
    { content: genSocial(), modelId: "social_profile" },
    { content: genBlog(), modelId: "blog" },
    { content: genBlog(), modelId: "blog" },
    { content: genBlog(), modelId: "blog" },
  ].forEach(({ content, modelId }) => {
    it(`should create ${modelId}`, async () => {
      const event = makeFakeEvent({
        path: "/",
        pathParameters: { modelId },
        headers: { "Content-Type": "application/json" },
        httpMethod: "POST",
        body: JSON.stringify(content),
      });

      const response = await create(event);
      expect(response.statusCode).toEqual(201);
      expect(response.isBase64Encoded).toBe(false);
      const json = JSON.parse(response.body);
      expect(json).toHaveProperty("id");

      const sk =
        modelId === "home" || modelId === "about_page"
          ? `CON#${modelId}`
          : `CON#${json.id}`;
      const params = {
        TableName: tableName,
        Key: {
          pk: `MOD#${modelId}`,
          sk,
        },
      };

      const { Item } = await ddb.get(params).promise();

      let expected = content;
      if (modelId === "home" || modelId === "about_page") {
        const { id, ...rest } = content;
        expected = rest;
      }
      expect(Item.data).toEqual(expected);

      contents[modelId].push({ ...expected, id: json.id });
    });
  });

  it("should list blogs with pagination", async () => {
    let event = makeFakeEvent({
      path: "/",
      pathParameters: { modelId: "blog" },
      headers: { "Content-Type": "application/json" },
      httpMethod: "GET",
    });

    let response = await list(event);
    expect(response.statusCode).toEqual(200);
    expect(response.isBase64Encoded).toBe(false);
    let json = JSON.parse(response.body);
    expect(json).toHaveProperty("cursor");
    expect(json.Items).toHaveLength(10);

    // second page
    event = makeFakeEvent({
      path: "/",
      pathParameters: { modelId: "blog" },
      queryStringParameters: { cursor: json.cursor },
      headers: { "Content-Type": "application/json" },
      httpMethod: "GET",
    });

    response = await list(event);
    expect(response.statusCode).toEqual(200);
    expect(response.isBase64Encoded).toBe(false);
    json = JSON.parse(response.body);
    expect(json).toHaveProperty("cursor");
    expect(json.Items).toHaveLength(6);
  });

  it("should list all blogs with fields", async () => {
    let event = makeFakeEvent({
      path: "/",
      pathParameters: { modelId: "blog" },
      queryStringParameters: { all: "true", fields: "true" },
      headers: { "Content-Type": "application/json" },
      httpMethod: "GET",
    });

    let response = await list(event);
    expect(response.statusCode).toEqual(200);
    expect(response.isBase64Encoded).toBe(false);
    let json = JSON.parse(response.body);
    expect(json).not.toHaveProperty("cursor");
    expect(json.Items).toHaveLength(16);
    expect(json.fields).toEqual(models[0].fields);

    // make sure sorted by last modified
    let lastModified = new Date().toISOString();
    json.Items.forEach((blog) => {
      expect(blog.modified <= lastModified).toBe(true);
      lastModified = blog.modified;
    });
  });

  it("should list all blogs filtered with last modified", async () => {
    const blog = contents.blog[6];
    const sk = `CON#${blog.id}`;
    const params = {
      TableName: tableName,
      Key: {
        pk: "MOD#blog",
        sk,
      },
    };

    const { Item } = await ddb.get(params).promise();
    const { _md: lastModified } = Item;

    let event = makeFakeEvent({
      path: "/",
      pathParameters: { modelId: "blog" },
      queryStringParameters: { all: "true", lastModified },
      headers: { "Content-Type": "application/json" },
      httpMethod: "GET",
    });

    let response = await list(event);
    expect(response.statusCode).toEqual(200);
    expect(response.isBase64Encoded).toBe(false);
    let json = JSON.parse(response.body);
    expect(json).not.toHaveProperty("cursor");
    expect(json.Items).toHaveLength(9);
  });

  it("should read a blog", async () => {
    const blog = contents.blog[5];
    const event = makeFakeEvent({
      path: "/",
      pathParameters: { modelId: "blog", id: blog.id },
      queryStringParameters: { all: "true" },
      headers: { "Content-Type": "application/json" },
      httpMethod: "GET",
    });

    const response = await read(event);
    expect(response.statusCode).toEqual(200);
    expect(response.isBase64Encoded).toBe(false);

    const json = JSON.parse(response.body);
    expect(json.id).toBe(blog.id);
    expect(json.name).toBe(blog.name);
    expect(json.cover_image).toEqual(blog.cover_image);
    expect(json.excerpt).toBe(blog.excerpt);
    expect(json.body).toBe(blog.body);
    expect(json.slug).toBe(blog.slug);
    expect(json.tags).toBe(blog.tags);
    expect(json).toHaveProperty("created");
    expect(json).toHaveProperty("modified");
    expect(json).not.toHaveProperty("pk");
    expect(json).not.toHaveProperty("pk2");
    expect(json).not.toHaveProperty("pk3");
    expect(json).not.toHaveProperty("sk");
    expect(json).not.toHaveProperty("sk2");
  });

  it("should throw content not found", async () => {
    const event = makeFakeEvent({
      path: "/",
      pathParameters: { modelId: "blog", id: "fake-id" },
      queryStringParameters: { all: "true" },
      headers: { "Content-Type": "application/json" },
      httpMethod: "GET",
    });

    const response = await read(event);
    expect(response.statusCode).toEqual(404);
    expect(response.isBase64Encoded).toBe(false);

    const json = JSON.parse(response.body);
    expect(json.message).toBe("Content not found");
  });

  it("should delete a blog", async () => {
    const blog = contents.blog[9];
    const event = makeFakeEvent({
      path: "/",
      pathParameters: { modelId: "blog", id: blog.id },
      queryStringParameters: { all: "true" },
      headers: { "Content-Type": "application/json" },
      httpMethod: "DELETE",
    });

    const response = await remove(event);
    expect(response.statusCode).toEqual(204);
    expect(response.isBase64Encoded).toBe(false);

    const sk = `CON#${blog.id}`;
    const params = {
      TableName: tableName,
      Key: {
        pk: `MOD#blog`,
        sk,
      },
    };

    const res = await ddb.get(params).promise();
    expect(res).not.toHaveProperty("Item");
  });

  it("should update a blog", async () => {
    const blog = contents.blog[9];
    const { id, ...content } = blog;
    const event = makeFakeEvent({
      path: "/",
      pathParameters: { modelId: "blog", id },
      queryStringParameters: { all: "true" },
      headers: { "Content-Type": "application/json" },
      httpMethod: "PUT",
      body: JSON.stringify({ ...content, name: "Edited blog" }),
    });

    const response = await update(event);
    expect(response.statusCode).toEqual(204);
    expect(response.isBase64Encoded).toBe(false);

    const sk = `CON#${id}`;
    const params = {
      TableName: tableName,
      Key: {
        pk: `MOD#blog`,
        sk,
      },
    };

    const res = await ddb.get(params).promise();
    expect(res.Item.data).toEqual({ ...content, name: "Edited blog" });
  });

  it("should authorize read only", async () => {
    const event = makeFakeEvent({
      path: "/",
      httpMethod: "GET",
      authorizationToken: "0f851da755f548668a094693779b8bc8",
      methodArn:
        "arn:aws:execute-api:localhost:random-account-id:random-api-id/local/GET/content/blog",
    });

    const response = await authorizer(event, {});
    expect(response).toStrictEqual({
      context: {},
      policyDocument: {
        Statement: [
          {
            Action: "execute-api:Invoke",
            Effect: "Allow",
            Resource: [
              "arn:aws:execute-api:localhost:random-account-id:random-api-id/local/GET/content/about_page",
              "arn:aws:execute-api:localhost:random-account-id:random-api-id/local/GET/content/about_page/*",
              "arn:aws:execute-api:localhost:random-account-id:random-api-id/local/GET/content/blog",
              "arn:aws:execute-api:localhost:random-account-id:random-api-id/local/GET/content/blog/*",
              "arn:aws:execute-api:localhost:random-account-id:random-api-id/local/GET/content/social_profile",
              "arn:aws:execute-api:localhost:random-account-id:random-api-id/local/GET/content/social_profile/*",
              "arn:aws:execute-api:localhost:random-account-id:random-api-id/local/GET/content/home",
              "arn:aws:execute-api:localhost:random-account-id:random-api-id/local/GET/content/home/*",
            ],
          },
        ],
        Version: "2012-10-17",
      },
      principalId: "1",
    });
  });

  it("should throw unauthorized", async () => {
    const event = makeFakeEvent({
      path: "/",
      httpMethod: "POST",
      methodArn:
        "arn:aws:execute-api:localhost:random-account-id:random-api-id/local/POST/content/blog",
    });

    expect.assertions(1);
    const response = await authorizer(event, {});
    expect(response).toBeNull();
  });

  it("should say hello", async () => {
    const response = await hello();
    expect(response.statusCode).toEqual(200);
    expect(response.isBase64Encoded).toBe(false);
  });
});
