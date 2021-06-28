const path = require("path");
const fs = require("fs");
const { execSync } = require("child_process");
const dotenv = require("dotenv");
const yaml = require("yaml");

let fileName = path.join(__dirname, `../config/${process.env.ABU_STAGE}.yml`);
let file = fs.readFileSync(fileName, "utf8");
let configs = yaml.parse(file);

const output = execSync(
  `aws cloudformation describe-stacks \
              --stack-name abu-upload-${process.env.STAGE} \
              --output json \
              --profile ${process.env.AWS_PROFILE} \
              --region us-east-1`,
  { encoding: "utf8" }
);

const upload = JSON.parse(output);
const cfDomainName = upload["Stacks"][0]["Outputs"].find(
  (v) => v.OutputKey === "CloudFrontDistributionDomainName"
);

configs.UPLOAD_BASE_URL = `https://${cfDomainName["OutputValue"]}`;

let newConfigs = yaml.stringify(configs);
fs.writeFileSync(fileName, newConfigs, { encoding: "utf8" });

fileName = path.join(
  __dirname,
  `../packages/cms/.env.production.${process.env.ABU_STAGE}`
);
file = fs.readFileSync(fileName, "utf8");
configs = dotenv.parse(file);

configs.REACT_APP_UPLOAD_ENDPOINT = `https://${cfDomainName["OutputValue"]}`;

newConfigs = ``;
Object.keys(configs).forEach(
  (key) => (newConfigs += `${key}=${configs[key]}\n`)
);

fs.writeFileSync(fileName, newConfigs, { encoding: "utf8" });
