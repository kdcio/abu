const faker = require("faker");
const kebabCase = require("../kebabCase");

module.exports = () => {
  const name = faker.random.words();
  const slug = kebabCase(name);

  const paraCount = faker.datatype.number({ max: 5 });
  let paragraphs = `<h1>${faker.lorem.words()}</h1>`;
  for (let ctr = 0; ctr < paraCount; ctr += 1) {
    paragraphs += `<p>${faker.lorem.paragraph()}</p>`;
  }

  const blog = {
    name,
    slug,
    cover_image: {
      src: faker.image.imageUrl(),
      type: faker.image.imageUrl(),
    },
    excerpt: faker.random.words(),
    body: paragraphs,
    tags: faker.lorem.words().replace(" ", ", "),
  };
  return blog;
};
