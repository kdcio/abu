const createEvent = require("@serverless/event-mocks").default;

const makeFakeEvent = (overrides) => {
  return createEvent("aws:apiGateway", {
    ...overrides,
  });
};

module.exports = {
  makeFakeEvent,
};
