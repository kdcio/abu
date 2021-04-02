const createEvent = require("@serverless/event-mocks").default;
const genUser = require("./gen/user");

const makeFakeEvent = (overrides) => {
  const user = genUser();
  return createEvent("aws:apiGateway", {
    requestContext: {
      authorizer: {
        claims: {
          sub: user.sub,
          name: `${user.firstName} ${user.lastName}`,
          given_name: user.firstName,
          family_name: user.lastName,
          "cognito:groups": ["admin"],
        },
      },
    },
    ...overrides,
  });
};

module.exports = {
  makeFakeEvent,
};
