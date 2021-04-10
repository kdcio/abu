const faker = require("faker");

module.exports = ({ withId = true } = {}) => {
  const content = {
    intro: faker.company.catchPhrase(),
    cover_image: {
      thumb: faker.image.imageUrl(),
      orig: faker.image.imageUrl(),
    },
  };
  if (withId) content.id = "home";
  return content;
};
