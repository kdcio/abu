import createEvent from "@serverless/event-mocks";
import genUser from "./user";

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
        },
      },
    },
    ...overrides,
  });
};

export default makeFakeEvent;
