const { dropTableIfExists, createTable, start } = require("./ddb");
const { makeFakeEvent } = require("./event");
const genModel = require("./gen/model");
const genBlog = require("./gen/blog");
const genHome = require("./gen/home");
const genAbout = require("./gen/about");
const genSocial = require("./gen/social");

module.exports = {
  dropTableIfExists,
  createTable,
  start,
  makeFakeEvent,
  genModel,
  genBlog,
  genHome,
  genAbout,
  genSocial,
};
