const faker = require("faker");

module.exports = () => {
  const name = faker.random.words();
  const modelId = faker.helpers.slugify(name);
  const model = {
    modelId,
    id: faker.random.uuid(),
    fields: [],
  };
  return model;
};
