import faker from "faker";
import makeFakeEvent from "../helpers/event";
import genUser from "../helpers/user";
import removeUser from "cognito/lib/remove";
import { handler } from "../../src/remove";

jest.mock("cognito/lib/remove");

describe("Remove User", () => {
  beforeAll(async () => {
    process.env.AWS_REGION = "ap-southeast-1";
    process.env.COG_POOL_ID = "pool-id";
  });

  beforeEach(() => {
    removeUser.mockClear();
  });

  it("should remove user by admin", async () => {
    const email = faker.internet.email();
    removeUser.mockImplementation(() => Promise.resolve());

    const event = makeFakeEvent({
      path: "/",
      pathParameters: { id: email },
      headers: { "Content-Type": "application/json" },
      httpMethod: "GET",
    });

    const response = await handler(event);
    expect(response.statusCode).toEqual(204);
    expect(response.isBase64Encoded).toBe(false);

    expect(removeUser).toBeCalledTimes(1);
    expect(removeUser).toBeCalledWith({ email });
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

    expect(removeUser).toBeCalledTimes(0);
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

    expect(removeUser).toBeCalledTimes(0);
  });

  it("should only allow admins to remove user", async () => {
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
    expect(json.message).toBe("Forbidden: only admins can perform this action");

    expect(removeUser).toBeCalledTimes(0);
  });
});
