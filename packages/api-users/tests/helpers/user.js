import faker from "faker";

const genUser = ({ withId = true } = {}) => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const provider = faker.internet.domainName();
  const user = {
    firstName,
    lastName,
    email: faker.internet.email(firstName, lastName, provider),
  };
  if (withId) user.sub = faker.datatype.uuid();
  return user;
};

export default genUser;
