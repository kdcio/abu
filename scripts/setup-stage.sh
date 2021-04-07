#!/bin/bash

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

if [ -z "$1" ]
  then
    echo -e "\nThis script will provision resources needed to run this CMS.\n"
    echo -e "Usage: setup-stage.sh ${BLUE}<stage> <email>${NC}\n"
    echo -e "Example: setup-stage.sh prod jon@doe.com\n"
  exit 1
fi

if [ -z "$2" ]
  then
    echo -e "\nMissing ${RED}email${NC}\n"
  exit 1
fi

STAGE=$1
export ENV_FILE="../packages/cms/.env.production.local"

echo -e "\n${BLUE}Setting up S3 and CloudFront for CMS...${NC}\n"
yarn workspace res setup:s3-cf $STAGE

echo -e "\n${BLUE}Setting up S3 and CloudFront for uploads...${NC}\n"
yarn workspace res setup:upload $STAGE

cd "$(dirname "$0")"
source ./config-to-env.sh
source ./cf-stack-output.sh
source ./pool-id.sh

OAUTH_CB="https://$CF_ENDPOINT"

# Add COG_OAUTH_CALLBACK in config
echo "COG_OAUTH_CALLBACK: $OAUTH_CB" >> ../config/$STAGE.yml
echo "CF_ID: $CF_ID" >> ../config/$STAGE.yml

./setup-cog.sh $STAGE $2

# Write additional cms env
echo "REACT_APP_AUTH_OAUTH_SIGNIN=$OAUTH_CB" >> $ENV_FILE
echo "REACT_APP_AUTH_OAUTH_SIGNOUT=$OAUTH_CB" >> $ENV_FILE
# echo "REACT_APP_API_ENDPOINT=http://localhost:8061" >> $ENV_FILE


echo -e "\n${BLUE}Setting up DynamoDB...${NC}\n"
yarn workspace res setup:ddb $STAGE
echo "DDB_TABLE: $PROJECT-$STAGE" >> ../config/$STAGE.yml

PAGINATION_SECRET=$(openssl rand -base64 32)
echo "PAGINATION_SECRET: $PAGINATION_SECRET" >> ../config/$STAGE.yml

echo -e "${GREEN}Setup Success!!!${NC}\n"

