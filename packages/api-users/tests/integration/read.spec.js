import faker from "faker";
import makeFakeEvent from "../helpers/event";
import genUser from "../helpers/user";
import readUser from "cognito/lib/read";
import { handler } from "../../src/read";

jest.mock("cognito/lib/read");

describe("Read User", () => {
  beforeAll(async () => {
    process.env.AWS_REGION = "ap-southeast-1";
    process.env.COG_POOL_ID = "pool-id";
  });

  beforeEach(() => {
    readUser.mockClear();
  });

  it("should read user by admin", async () => {
    const email = faker.internet.email();
    const user = {
      created: "2021-03-29T01:05:14.954Z",
      updated: "2021-03-29T01:12:50.287Z",
      statues: "CONFIRMED",
      username: "ec2c8bb1-ada6-41d7-8451-aee42ad0d5d7",
      sub: "ec2c8bb1-ada6-41d7-8451-aee42ad0d5d7",
      given_name: "John",
      family_name: "Doe",
      email,
      groups: ["admin"],
    };
    readUser.mockImplementation(() => Promise.resolve(user));

    const event = makeFakeEvent({
      path: "/",
      pathParameters: { id: email },
      headers: { "Content-Type": "application/json" },
      httpMethod: "GET",
    });

    const response = await handler(event);
    expect(response.statusCode).toEqual(200);
    expect(response.isBase64Encoded).toBe(false);

    const json = JSON.parse(response.body);
    expect(json).toEqual(user);

    expect(readUser).toBeCalledTimes(1);
    expect(readUser).toBeCalledWith({ email });
  });

  it("should read user by self", async () => {
    const email = faker.internet.email();
    const user = {
      created: "2021-03-29T01:05:14.954Z",
      updated: "2021-03-29T01:12:50.287Z",
      statues: "CONFIRMED",
      username: "ec2c8bb1-ada6-41d7-8451-aee42ad0d5d7",
      sub: "ec2c8bb1-ada6-41d7-8451-aee42ad0d5d7",
      given_name: "John",
      family_name: "Doe",
      email,
      groups: ["admin"],
    };
    readUser.mockImplementation(() => Promise.resolve(user));

    const event = makeFakeEvent({
      requestContext: {
        authorizer: {
          claims: {
            sub: user.sub,
            name: `${user.given_name} ${user.family_name}`,
            given_name: user.given_name,
            family_name: user.family_name,
            "cognito:groups": ["editor"],
          },
        },
      },
      path: "/",
      pathParameters: { id: user.sub },
      headers: { "Content-Type": "application/json" },
      httpMethod: "GET",
    });

    const response = await handler(event);
    expect(response.statusCode).toEqual(200);
    expect(response.isBase64Encoded).toBe(false);

    const json = JSON.parse(response.body);
    expect(json).toEqual(user);

    expect(readUser).toBeCalledTimes(1);
    expect(readUser).toBeCalledWith({ email: user.sub });
  });

  it("should throw missing username", async () => {
    const event = makeFakeEvent({
      path: "/",
      pathParameters: {},
      headers: { "Content-Type": "application/json" },
      httpMethod: "GET",
    });

    const response = await handler(event);
    expect(response.statusCode).toEqual(400);
    expect(response.isBase64Encoded).toBe(false);

    const json = JSON.parse(response.body);
    expect(json.message).toBe("Missing username");

    expect(readUser).toBeCalledTimes(0);
  });

  it("should throw unauthorized", async () => {
    const email = faker.internet.email();
    const event = makeFakeEvent({
      requestContext: {},
      path: "/",
      headers: { "Content-Type": "application/json" },
      httpMethod: "GET",
    });

    const response = await handler(event);
    expect(response.statusCode).toEqual(401);
    expect(response.isBase64Encoded).toBe(false);

    const json = JSON.parse(response.body);
    expect(json.message).toBe("Unauthorized");

    expect(readUser).toBeCalledTimes(0);
  });

  it("should only allow admins or self to read user", async () => {
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
      pathParameters: { id: email },
      headers: { "Content-Type": "application/json" },
      httpMethod: "GET",
    });

    const response = await handler(event);
    expect(response.statusCode).toEqual(403);
    expect(response.isBase64Encoded).toBe(false);

    const json = JSON.parse(response.body);
    expect(json.message).toBe(
      "Forbidden: only admins or self can perform this action"
    );

    expect(readUser).toBeCalledTimes(0);
  });
});
