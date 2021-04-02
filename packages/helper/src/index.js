const { dropTableIfExists, createTable, start } = require("./ddb");
const { makeFakeEvent } = require("./event");
const genModel = require("./gen/model");

module.exports = {
  dropTableIfExists,
  createTable,
  start,
  makeFakeEvent,
  genModel,
};
