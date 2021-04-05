const faker = require("faker");

module.exports = () => {
  const content = {
    id: "home",
    intro: faker.company.catchPhrase(),
    cover_image: {
      thumb: faker.image.imageUrl(),
      orig: faker.image.imageUrl(),
    },
  };
  return content;
};
