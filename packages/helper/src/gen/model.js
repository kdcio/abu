const faker = require("faker");

const genField = () => ({
  name: faker.commerce.productName(),
  help: faker.random.words(),
  default: faker.random.words(),
  id: faker.random.word(),
  validations: {
    required: faker.datatype.boolean(),
  },
  type: faker.random.arrayElement([
    "text",
    "rich-text",
    "image",
    "date",
    "slug",
  ]),
});

module.exports = () => {
  const name = faker.random.words();
  const model = {
    name,
    id: faker.helpers.slugify(name),
    collection: faker.datatype.boolean(),
    fields: [genField(), genField(), genField(), genField(), genField()],
  };
  return model;
};
