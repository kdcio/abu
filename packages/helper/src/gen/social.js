const faker = require("faker");

module.exports = () => {
  const content = {
    name: faker.random.word(),
    url: faker.internet.url(),
  };
  return content;
};
