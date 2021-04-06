const faker = require("faker");

module.exports = () => {
  const paraCount = faker.datatype.number({ max: 5 });
  let paragraphs = `<h1>${faker.lorem.words()}</h1>`;
  for (let ctr = 0; ctr < paraCount; ctr += 1) {
    paragraphs += `<p>${faker.lorem.paragraph()}</p>`;
  }

  const content = {
    id: "about_page",
    title: faker.company.companyName(),
    subtitle: faker.company.catchPhrase(),
    photo: {
      thumb: faker.image.imageUrl(),
      orig: faker.image.imageUrl(),
    },
    bio: paragraphs,
  };
  return content;
};
