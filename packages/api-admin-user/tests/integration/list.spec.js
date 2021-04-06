import faker from "faker";
import makeFakeEvent from "../helpers/event";
import genUser from "../helpers/user";
import listUsers from "cognito/lib/list";
import { handler } from "../../src/list";
import users from "../fixtures/users.json";

jest.mock("cognito/lib/list");

describe("List Users", () => {
  beforeAll(async () => {
    process.env.AWS_REGION = "ap-southeast-1";
    process.env.COG_POOL_ID = "pool-id";
  });

  beforeEach(() => {
    listUsers.mockClear();
  });

  it("should list users by admin", async () => {
    listUsers.mockImplementation(() => Promise.resolve(users));

    const event = makeFakeEvent({
      path: "/",
      headers: { "Content-Type": "application/json" },
      httpMethod: "GET",
    });

    const response = await handler(event);
    expect(response.statusCode).toEqual(200);
    expect(response.isBase64Encoded).toBe(false);

    const json = JSON.parse(response.body);
    expect(json).toEqual(users);

    expect(listUsers).toBeCalledTimes(1);
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

    expect(listUsers).toBeCalledTimes(0);
  });

  it("should only allow admins to list users", async () => {
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
      httpMethod: "GET",
    });

    const response = await handler(event);
    expect(response.statusCode).toEqual(403);
    expect(response.isBase64Encoded).toBe(false);

    const json = JSON.parse(response.body);
    expect(json.message).toBe("Forbidden: only admins can perform this action");

    expect(listUsers).toBeCalledTimes(0);
  });
});
