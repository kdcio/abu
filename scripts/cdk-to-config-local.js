const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const dotenv = require("dotenv");
const yaml = require("yaml");
const cdkOutput = require("../infra/.infra-output.json");

const STAGE = "local";

/**
 * Update config yaml for API
 */
let fileName = path.join(__dirname, `../config/local.yml`);
let file = fs.readFileSync(fileName, "utf8");
let configs = yaml.parse(file);

const stack = cdkOutput[`AbuStack-${STAGE}`];
configs.COG_POOL_ID = stack[`COGPOOLID${STAGE}`];
configs.COG_POOL_ARN = stack[`COGPOOLARN${STAGE}`];
configs.COG_POOL_CLIENT_ID = stack[`COGPOOLCLIENTID${STAGE}`];
configs.COG_POOL_CLIENT_DOMAIN = stack[`COGPOOLCLIENTDOMAIN${STAGE}`];
configs.COG_ACCESS_KEY_ID = stack[`COGACCESSKEYID${STAGE}`];
configs.COG_SECRET_ACCESS_KEY = stack[`COGSECRETACCESSKEY${STAGE}`];
configs.COG_OAUTH_CALLBACK = "http://localhost:8060";
configs.PAGINATION_SECRET = crypto.randomBytes(32).toString("hex");
configs.DDB_TABLE = "abu-local";
configs.DDB_ENDPOINT = "http://localhost:8062";

let newConfigs = yaml.stringify(configs);
fs.writeFileSync(fileName, newConfigs, { encoding: "utf8" });

/**
 * Update env for CMS
 */
fileName = path.join(__dirname, `../packages/cms/.env`);
try {
  file = fs.readFileSync(fileName, "utf8");
  configs = dotenv.parse(file);
} catch (error) {
  configs = {};
}

configs.REACT_APP_AUTH_AWS_REGION = process.env.AWS_REGION;
configs.REACT_APP_AUTH_POOL_ID = stack[`COGPOOLID${STAGE}`];
configs.REACT_APP_AUTH_CLIENT_ID = stack[`COGPOOLCLIENTID${STAGE}`];
configs.REACT_APP_AUTH_OAUTH_DOMAIN = `${
  stack[`COGPOOLCLIENTDOMAIN${STAGE}`]
}.auth.${process.env.AWS_REGION}.amazoncognito.com`;
configs.REACT_APP_AUTH_OAUTH_SIGNIN = "http://localhost:8060";
configs.REACT_APP_AUTH_OAUTH_SIGNOUT = "http://localhost:8060";
configs.REACT_APP_UPLOAD_ENDPOINT = "http://localhost:8064";
configs.REACT_APP_API_ENDPOINT = "http://localhost:8061";

newConfigs = ``;

Object.keys(configs).forEach(
  (key) => (newConfigs += `${key}=${configs[key]}\n`)
);

fs.writeFileSync(fileName, newConfigs, { encoding: "utf8" });
