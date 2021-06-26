const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const yaml = require("yaml");
const cdkOutput = require("../infra/.infra-output.json");

const fileName = path.join(__dirname, `../config/${process.env.ABU_STAGE}.yml`);
const file = fs.readFileSync(fileName, "utf8");
const configs = yaml.parse(file);

const stack = cdkOutput["AbuStack-github"];
configs.COG_POOL_ID = stack.COGPOOLID;
configs.COG_POOL_CLIENT_ID = stack.COGPOOLCLIENTID;
configs.COG_POOL_CLIENT_DOMAIN = stack.COGPOOLCLIENTDOMAIN;
configs.COG_ACCESS_KEY_ID = stack.COGACCESSKEYID;
configs.COG_SECRET_ACCESS_KEY = stack.COGSECRETACCESSKEY;
configs.COG_OAUTH_CALLBACK = `https://${stack.COGPOOLCLIENTID}`;
configs.CF_ID = stack.CFID;
configs.PAGINATION_SECRET = crypto.randomBytes(32).toString("hex");
configs.DDB_TABLE = process.env.PROJECT;

const newConfigs = yaml.stringify(configs);
fs.writeFileSync(fileName, newConfigs, { encoding: "utf8" });
