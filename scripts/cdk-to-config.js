const path = require("path");
const fs = require("fs");
const yaml = require("yaml");
const cdkOutput = require("../infra/.infra-output.json");

console.log(cdkOutput);

const fileName = path.join(__dirname, `../config/${process.env.ABU_STAGE}.yml`);
const file = fs.readFileSync(fileName, "utf-8");
const configs = yaml.parse(file);

configs.COG_POOL_ID = cdkOutput["AbuStack-github"].COGPOOLID;
configs.COG_POOL_CLIENT_ID = cdkOutput["AbuStack-github"].COGPOOLCLIENTID;
configs.COG_POOL_CLIENT_DOMAIN =
  cdkOutput["AbuStack-github"].COGPOOLCLIENTDOMAIN;
configs.COG_OAUTH_CALLBACK = `https://${cdkOutput["AbuStack-github"].COGPOOLCLIENTID}`;
configs.CF_ID = cdkOutput["AbuStack-github"].CFID;

console.log(configs);
