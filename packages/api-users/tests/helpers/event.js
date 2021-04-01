import createEvent from "@serverless/event-mocks";
import genUser from "./user";

const makeFakeEvent = (overrides) => {
  const user = genUser();

  /***
   * Sample autorizer
      {
        claims: {
          sub: 'ec2c8bb1-ada6-41d7-8451-fee42ad0d5d7',
          'cognito:groups': [ 'admin' ],
          iss: 'https://cognito-idp.ap-southeast-1.amazonaws.com/ap-southeast-1_ly9CmQ3sG',
          'cognito:username': 'ec2c8bb1-ada6-41d7-8451-fee42ad0d5d7',
          given_name: 'Ian',
          aud: '1g18bjsbdccbm2s0lc2ui74r1k',
          event_id: 'c6f7caaf-9538-4957-a9e6-4de3449e8496',
          token_use: 'id',
          auth_time: 1617065881,
          exp: 1617229344,
          iat: 1617225744,
          family_name: 'Admin',
          email: 'ian@kdcsoftware.com'
        },
        principalId: 'offlineContext_authorizer_principalId'
      }
   */
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

export default makeFakeEvent;
