const faker = require("faker");

module.exports = () => {
  const name = faker.random.words();
  const model = {
    name,
    id: faker.helpers.slugify(name),
    collection: faker.datatype.boolean(),
    fields: [],
  };
  return model;
};
