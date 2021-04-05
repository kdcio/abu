import {
  start,
  makeFakeEvent,
  genBlog,
  genAbout,
  genHome,
  genSocial,
} from "helper";
import { handler as create } from "../../src/create";

let ddb;
let tableName;
const models = [];

describe("Content", () => {
  beforeAll(async () => {
    ({ DocumentClient: ddb, TableName: tableName } = await start());
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
    { content: genBlog(), modelId: "blog" },
    { content: genBlog(), modelId: "blog" },
    { content: genSocial(), modelId: "social_profile" },
    { content: genBlog(), modelId: "blog" },
    { content: genSocial(), modelId: "social_profile" },
    { content: genBlog(), modelId: "blog" },
    { content: genSocial(), modelId: "social_profile" },
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

      // models.push({ ...model });
    });
  });
});
