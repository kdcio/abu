import {
  start,
  makeFakeEvent,
  genBlog,
  genAbout,
  genHome,
  genSocial,
} from "helper";
import Content from "model/lib/entities/Content";
import { handler as reset } from "../../src/reset";

let ddb;
let tableName;

describe("Content", () => {
  beforeAll(async () => {
    ({ DocumentClient: ddb, TableName: tableName } = await start());
    const proms = [];
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
    ].forEach(async ({ content, modelId }) => {
      const { id: inId } = content;
      const id = inId || new Date().valueOf().toString();
      proms.push(Content.put({ data: content, id, modelId }));
    });
    try {
      await Promise.all(proms);
    } catch (error) {
      console.log(error);
    }
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
