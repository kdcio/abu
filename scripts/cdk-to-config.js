const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const dotenv = require("dotenv");
const yaml = require("yaml");
const cdkOutput = require("../infra/.infra-output.json");

const { ABU_STAGE } = process.env;

/**
 * Update config yaml for API
 */
let fileName = path.join(__dirname, `../config/${ABU_STAGE}.yml`);
let file = fs.readFileSync(fileName, "utf8");
let configs = yaml.parse(file);

const stack = cdkOutput[`AbuStack-${ABU_STAGE}`];
configs.COG_POOL_ID = stack[`COGPOOLID${ABU_STAGE}`];
configs.COG_POOL_ARN = stack[`COGPOOLARN${ABU_STAGE}`];
configs.COG_POOL_CLIENT_ID = stack[`COGPOOLCLIENTID${ABU_STAGE}`];
configs.COG_POOL_CLIENT_DOMAIN = stack[`COGPOOLCLIENTDOMAIN${ABU_STAGE}`];
configs.COG_ACCESS_KEY_ID = stack[`COGACCESSKEYID${ABU_STAGE}`];
configs.COG_SECRET_ACCESS_KEY = stack[`COGSECRETACCESSKEY${ABU_STAGE}`];
configs.COG_OAUTH_CALLBACK = `https://${stack[`CFURL${ABU_STAGE}`]}`;
configs.CF_ID = stack[`CFID${ABU_STAGE}`];
configs.PAGINATION_SECRET = crypto.randomBytes(32).toString("hex");
configs.DDB_TABLE = process.env.PROJECT;

let newConfigs = yaml.stringify(configs);
fs.writeFileSync(fileName, newConfigs, { encoding: "utf8" });

/**
 * Update env for CMS
 */
fileName = path.join(__dirname, `../packages/cms/.env.production.${ABU_STAGE}`);
try {
  file = fs.readFileSync(fileName, "utf8");
  configs = dotenv.parse(file);
} catch (error) {
  configs = {};
}

configs.REACT_APP_AUTH_AWS_REGION = process.env.AWS_REGION;
configs.REACT_APP_AUTH_POOL_ID = stack[`COGPOOLID${ABU_STAGE}`];
configs.REACT_APP_AUTH_CLIENT_ID = stack[`COGPOOLCLIENTID${ABU_STAGE}`];
configs.REACT_APP_AUTH_OAUTH_DOMAIN = `${
  stack[`COGPOOLCLIENTDOMAIN${ABU_STAGE}`]
}.auth.${process.env.AWS_REGION}.amazoncognito.com`;
configs.REACT_APP_AUTH_OAUTH_SIGNIN = `https://${stack[`CFURL${ABU_STAGE}`]}`;
configs.REACT_APP_AUTH_OAUTH_SIGNOUT = `https://${stack[`CFURL${ABU_STAGE}`]}`;
configs.REACT_APP_UPLOAD_ENDPOINT = configs.REACT_APP_UPLOAD_ENDPOINT || "";
configs.REACT_APP_API_ENDPOINT = configs.REACT_APP_API_ENDPOINT || "";

newConfigs = ``;

Object.keys(configs).forEach(
  (key) => (newConfigs += `${key}=${configs[key]}\n`)
);

fs.writeFileSync(fileName, newConfigs, { encoding: "utf8" });
