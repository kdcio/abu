import faker from "faker";
import makeFakeEvent from "../helpers/event";
import genUser from "../helpers/user";
import updateUser from "cognito/lib/updateAttributes";
import setGroup from "cognito/lib/setGroup";
import { handler } from "../../src/update";

jest.mock("cognito/lib/updateAttributes");
jest.mock("cognito/lib/setGroup");

describe("Update User", () => {
  beforeAll(async () => {
    process.env.AWS_REGION = "ap-southeast-1";
    process.env.COG_POOL_ID = "pool-id";
  });

  beforeEach(() => {
    updateUser.mockClear();
    setGroup.mockClear();
  });

  it("should update user by admin", async () => {
    const email = faker.internet.email();
    updateUser.mockImplementation(() => Promise.resolve());

    const event = makeFakeEvent({
      path: "/",
      pathParameters: { id: email },
      headers: { "Content-Type": "application/json" },
      httpMethod: "PATCH",
      body: JSON.stringify({
        firstName: "John",
        lastName: "Doe",
        oldGroup: "editor",
        newGroup: "admin",
      }),
    });

    const response = await handler(event);
    expect(response.statusCode).toEqual(204);
    expect(response.isBase64Encoded).toBe(false);

    expect(updateUser).toBeCalledTimes(1);
    expect(setGroup).toBeCalledTimes(1);
    expect(updateUser).toBeCalledWith({
      email,
      attributes: {
        firstName: "John",
        lastName: "Doe",
      },
    });
    expect(setGroup).toBeCalledWith({
      email,
      oldGroup: "editor",
      newGroup: "admin",
    });
  });

  it("should update attributes only", async () => {
    const email = faker.internet.email();
    updateUser.mockImplementation(() => Promise.resolve());

    const event = makeFakeEvent({
      path: "/",
      pathParameters: { id: email },
      headers: { "Content-Type": "application/json" },
      httpMethod: "PATCH",
      body: JSON.stringify({
        firstName: "John",
        lastName: "Doe",
      }),
    });

    const response = await handler(event);
    expect(response.statusCode).toEqual(204);
    expect(response.isBase64Encoded).toBe(false);

    expect(updateUser).toBeCalledTimes(1);
    expect(setGroup).toBeCalledTimes(0);
    expect(updateUser).toBeCalledWith({
      email,
      attributes: {
        firstName: "John",
        lastName: "Doe",
      },
    });
  });

  it("should update group only", async () => {
    const email = faker.internet.email();
    updateUser.mockImplementation(() => Promise.resolve());

    const event = makeFakeEvent({
      path: "/",
      pathParameters: { id: email },
      headers: { "Content-Type": "application/json" },
      httpMethod: "PATCH",
      body: JSON.stringify({
        oldGroup: "editor",
        newGroup: "admin",
      }),
    });

    const response = await handler(event);
    expect(response.statusCode).toEqual(204);
    expect(response.isBase64Encoded).toBe(false);

    expect(updateUser).toBeCalledTimes(0);
    expect(setGroup).toBeCalledTimes(1);
    expect(setGroup).toBeCalledWith({
      email,
      oldGroup: "editor",
      newGroup: "admin",
    });
  });

  it("should throw missing username", async () => {
    const event = makeFakeEvent({
      path: "/",
      pathParameters: {},
      headers: { "Content-Type": "application/json" },
      httpMethod: "PATCH",
    });

    const response = await handler(event);
    expect(response.statusCode).toEqual(400);
    expect(response.isBase64Encoded).toBe(false);

    const json = JSON.parse(response.body);
    expect(json.message).toBe("Missing username");

    expect(updateUser).toBeCalledTimes(0);
  });

  it("should throw unauthorized", async () => {
    const event = makeFakeEvent({
      requestContext: {},
      path: "/",
      headers: { "Content-Type": "application/json" },
      httpMethod: "PATCH",
    });

    const response = await handler(event);
    expect(response.statusCode).toEqual(401);
    expect(response.isBase64Encoded).toBe(false);

    const json = JSON.parse(response.body);
    expect(json.message).toBe("Unauthorized");

    expect(updateUser).toBeCalledTimes(0);
  });

  it("should only allow admins to update user", async () => {
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
      httpMethod: "PATCH",
    });

    const response = await handler(event);
    expect(response.statusCode).toEqual(403);
    expect(response.isBase64Encoded).toBe(false);

    const json = JSON.parse(response.body);
    expect(json.message).toBe("Forbidden: only admins can perform this action");

    expect(updateUser).toBeCalledTimes(0);
  });
});
