import faker from "faker";
import makeFakeEvent from "../helpers/event";
import genUser from "../helpers/user";
import changePassword from "cognito/lib/changePassword";
import { handler } from "../../src/password";

jest.mock("cognito/lib/changePassword");

describe("Change Password", () => {
  beforeAll(async () => {
    process.env.AWS_REGION = "ap-southeast-1";
    process.env.COG_POOL_ID = "pool-id";
  });

  beforeEach(() => {
    changePassword.mockClear();
  });

  it("should change password by admin", async () => {
    const email = faker.internet.email();
    const password = faker.internet.password();
    changePassword.mockImplementation(() => Promise.resolve());

    const event = makeFakeEvent({
      path: `/${email}/password`,
      pathParameters: { id: email },
      headers: { "Content-Type": "application/json" },
      httpMethod: "PATCH",
      body: JSON.stringify({ password }),
    });

    const response = await handler(event);
    expect(response.statusCode).toEqual(204);
    expect(response.isBase64Encoded).toBe(false);

    expect(changePassword).toBeCalledTimes(1);
    expect(changePassword).toBeCalledWith({ email, password });
  });

  it("should read user by self", async () => {
    const user = genUser();
    const password = faker.internet.password();
    changePassword.mockImplementation(() => Promise.resolve());

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
      path: `/${user.sub}/password`,
      pathParameters: { id: user.sub },
      headers: { "Content-Type": "application/json" },
      httpMethod: "PATCH",
      body: JSON.stringify({ password }),
    });

    const response = await handler(event);
    expect(response.statusCode).toEqual(204);
    expect(response.isBase64Encoded).toBe(false);

    expect(changePassword).toBeCalledTimes(1);
    expect(changePassword).toBeCalledWith({ email: user.sub, password });
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

    expect(changePassword).toBeCalledTimes(0);
  });

  it("should throw missing password", async () => {
    const email = faker.internet.email();
    const event = makeFakeEvent({
      path: `/${email}/password`,
      pathParameters: { id: email },
      headers: { "Content-Type": "application/json" },
      httpMethod: "GET",
    });

    const response = await handler(event);
    expect(response.statusCode).toEqual(400);
    expect(response.isBase64Encoded).toBe(false);

    const json = JSON.parse(response.body);
    expect(json.message).toBe("Missing password");

    expect(changePassword).toBeCalledTimes(0);
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

    expect(changePassword).toBeCalledTimes(0);
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

    expect(changePassword).toBeCalledTimes(0);
  });
});
