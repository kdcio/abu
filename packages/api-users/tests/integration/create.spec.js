import faker from "faker";
import makeFakeEvent from "../helpers/event";
import genUser from "../helpers/user";
import createUser from "cognito/lib/create";
import { handler } from "../../src/create";

jest.mock("cognito/lib/create");

describe("Create User", () => {
  beforeAll(async () => {
    process.env.AWS_REGION = "ap-southeast-1";
    process.env.COG_POOL_ID = "pool-id";
  });

  beforeEach(() => {
    createUser.mockClear();
  });

  it("should create user", async () => {
    createUser.mockImplementation(() => Promise.resolve());
    const email = faker.internet.email();
    const group = "editor";

    const event = makeFakeEvent({
      path: "/",
      headers: { "Content-Type": "application/json" },
      httpMethod: "POST",
      body: JSON.stringify({ email, group }),
    });

    const response = await handler(event);
    expect(response.statusCode).toEqual(201);
    expect(response.isBase64Encoded).toBe(false);

    expect(createUser).toBeCalledTimes(1);
    expect(createUser).toBeCalledWith({ email, group });
  });

  it("should throw missing email", async () => {
    const event = makeFakeEvent({
      path: "/",
      headers: { "Content-Type": "application/json" },
      httpMethod: "POST",
    });

    const response = await handler(event);
    expect(response.statusCode).toEqual(400);
    expect(response.isBase64Encoded).toBe(false);

    const json = JSON.parse(response.body);
    expect(json.message).toBe("Missing email");

    expect(createUser).toBeCalledTimes(0);
  });

  it("should throw missing group", async () => {
    const email = faker.internet.email();
    const event = makeFakeEvent({
      path: "/",
      headers: { "Content-Type": "application/json" },
      httpMethod: "POST",
      body: JSON.stringify({ email }),
    });

    const response = await handler(event);
    expect(response.statusCode).toEqual(400);
    expect(response.isBase64Encoded).toBe(false);

    const json = JSON.parse(response.body);
    expect(json.message).toBe("Missing group");

    expect(createUser).toBeCalledTimes(0);
  });

  it("should throw unauthorized", async () => {
    const email = faker.internet.email();
    const event = makeFakeEvent({
      requestContext: {},
      path: "/",
      headers: { "Content-Type": "application/json" },
      httpMethod: "POST",
      body: JSON.stringify({ email }),
    });

    const response = await handler(event);
    expect(response.statusCode).toEqual(401);
    expect(response.isBase64Encoded).toBe(false);

    const json = JSON.parse(response.body);
    expect(json.message).toBe("Unauthorized");

    expect(createUser).toBeCalledTimes(0);
  });

  it("should throw forbidden", async () => {
    const email = faker.internet.email();
    const user = genUser();
    const event = makeFakeEvent({
      requestContext: {
        authorizer: {
          claims: {
            sub: user.sub,
            name: `${user.firstName} ${user.lastName}`,
            given_name: user.firstName,
            family_name: user.lastName,
            "cognito:groups": ["editor"],
          },
        },
      },
      path: "/",
      headers: { "Content-Type": "application/json" },
      httpMethod: "POST",
      body: JSON.stringify({ email }),
    });

    const response = await handler(event);
    expect(response.statusCode).toEqual(403);
    expect(response.isBase64Encoded).toBe(false);

    const json = JSON.parse(response.body);
    expect(json.message).toBe("Forbidden: only admins can perform this action");

    expect(createUser).toBeCalledTimes(0);
  });
});
