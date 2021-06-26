const path = require("path");
const fs = require("fs");
const { execSync } = require("child_process");
const dotenv = require("dotenv");

const output = execSync(
  `aws cloudformation describe-stacks \
              --stack-name abu-api-${process.env.STAGE} \
              --output json \
              --profile ${process.env.AWS_PROFILE} \
              --region us-east-1`,
  { encoding: "utf8" }
);

const upload = JSON.parse(output);
const apiEndpoint = upload["Stacks"][0]["Outputs"].find(
  (v) => v.OutputKey === "ServiceEndpoint"
);

const fileName = path.join(
  __dirname,
  `../packages/cms/.env.production.${process.env.ABU_STAGE}`
);
const file = fs.readFileSync(fileName, "utf8");
const configs = dotenv.parse(file);

configs.REACT_APP_API_ENDPOINT = apiEndpoint["OutputValue"];

let newConfigs = ``;
Object.keys(configs).forEach(
  (key) => (newConfigs += `${key}=${configs[key]}\n`)
);

fs.writeFileSync(fileName, newConfigs, { encoding: "utf8" });
