# Abu CMS

Serverless Headless CMS. Deployed in AWS infrastructure.

## Requirements

- Operating system with bash - MacOS or Linux
- [aws cli](https://aws.amazon.com/cli/) with working [named profile](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html)
- [nodejs](https://nodejs.org/en/)
- [yarn](https://yarnpkg.com/)

## Development

1. Clone this project and install packages

   ```bash
   git clone https://github.com/kdcio/abu.git
   cd abu
   yarn
   ```

2. Create `config/dev.yml` and add `PROJECT_NAME`, `REGION` and `PROFILE`.

   ```yaml
   PROJECT_NAME: myproject
   REGION: ap-southeast-1
   PROFILE: dev
   ```

   `PROJECT_NAME` will be referenced in all resources used in AWS. It must be unique with only letters and numbers.

   `REGION` is the [AWS Region](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.RegionsAndAvailabilityZones.html) you want your application to be deployed.

   `PROFILE` is used by AWS CLI to indentify who you are. Here's how you configure [named profiles](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html).

3. Create `packages/cms/.env` and add the following:

   ```env
   REACT_APP_AUTH_AWS_REGION=ap-southeast-1
   REACT_APP_AUTH_POOL_ID=ap-southeast-1_xxxxxxxxx
   REACT_APP_AUTH_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx
   REACT_APP_AUTH_OAUTH_DOMAIN=xxx-dev.auth.ap-southeast-1.amazoncognito.com
   REACT_APP_AUTH_OAUTH_SIGNIN=http://localhost:8060
   REACT_APP_AUTH_OAUTH_SIGNOUT=http://localhost:8060
   REACT_APP_API_ENDPOINT=http://localhost:8061
   ```
