const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const dotenv = require("dotenv");
const yaml = require("yaml");
const cdkOutput = require("../infra/.infra-output.json");

/**
 * Update config yaml for API
 */
let fileName = path.join(__dirname, `../config/${process.env.ABU_STAGE}.yml`);
let file = fs.readFileSync(fileName, "utf8");
let configs = yaml.parse(file);

const stack = cdkOutput[`AbuStack-${process.env.ABU_STAGE}`];
configs.COG_POOL_ID = stack.COGPOOLID;
configs.COG_POOL_ARN = stack.COGPOOLARN;
configs.COG_POOL_CLIENT_ID = stack.COGPOOLCLIENTID;
configs.COG_POOL_CLIENT_DOMAIN = stack.COGPOOLCLIENTDOMAIN;
configs.COG_ACCESS_KEY_ID = stack.COGACCESSKEYID;
configs.COG_SECRET_ACCESS_KEY = stack.COGSECRETACCESSKEY;
configs.COG_OAUTH_CALLBACK = `https://${stack.CFURL}`;
configs.CF_ID = stack.CFID;
configs.PAGINATION_SECRET = crypto.randomBytes(32).toString("hex");
configs.DDB_TABLE = process.env.PROJECT;

let newConfigs = yaml.stringify(configs);
fs.writeFileSync(fileName, newConfigs, { encoding: "utf8" });

/**
 * Update env for CMS
 */
fileName = path.join(
  __dirname,
  `../packages/cms/.env.production.${process.env.ABU_STAGE}`
);
try {
  file = fs.readFileSync(fileName, "utf8");
  configs = dotenv.parse(file);
} catch (error) {
  configs = {};
}

configs.REACT_APP_AUTH_AWS_REGION = process.env.AWS_REGION;
configs.REACT_APP_AUTH_POOL_ID = stack.COGPOOLID;
configs.REACT_APP_AUTH_CLIENT_ID = stack.COGPOOLCLIENTID;
configs.REACT_APP_AUTH_OAUTH_DOMAIN = `${stack.COGPOOLCLIENTDOMAIN}.auth.${process.env.AWS_REGION}.amazoncognito.com`;
configs.REACT_APP_AUTH_OAUTH_SIGNIN = `https://${stack.CFURL}`;
configs.REACT_APP_AUTH_OAUTH_SIGNOUT = `https://${stack.CFURL}`;
configs.REACT_APP_UPLOAD_ENDPOINT = configs.REACT_APP_UPLOAD_ENDPOINT || "";
configs.REACT_APP_API_ENDPOINT = configs.REACT_APP_API_ENDPOINT || "";

newConfigs = ``;

Object.keys(configs).forEach(
  (key) => (newConfigs += `${key}=${configs[key]}\n`)
);

fs.writeFileSync(fileName, newConfigs, { encoding: "utf8" });
