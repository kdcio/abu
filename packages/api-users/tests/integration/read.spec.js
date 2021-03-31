import faker from "faker";
import makeFakeEvent from "../helpers/event";
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

  it("should read user", async () => {
    readUser.mockImplementation(() => Promise.resolve({ name: "john" }));
    const email = faker.internet.email();

    const event = makeFakeEvent({
      path: "/",
      headers: { "Content-Type": "application/json" },
      httpMethod: "POST",
      body: JSON.stringify({ email }),
    });

    const response = await handler(event);
    expect(response.statusCode).toEqual(200);
    expect(response.isBase64Encoded).toBe(false);

    const json = JSON.parse(response.body);
    expect(json).toEqual({ name: "john" });

    expect(readUser).toBeCalledTimes(1);
    expect(readUser).toBeCalledWith({ email });
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

    expect(readUser).toBeCalledTimes(0);
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

    expect(readUser).toBeCalledTimes(0);
  });
});
