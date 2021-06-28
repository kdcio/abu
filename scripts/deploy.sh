#!/bin/bash

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

if [ -z "$1" ]
  then
    echo -e "\nThis script will deploy the CMS.\n"
    echo -e "Usage: deploy.sh ${BLUE}<stage>${NC}\n"
    echo -e "Example: deploy.sh prod\n"
  exit 1
fi

export STAGE=$1
CONFIG_FILE=./config/$STAGE.yml

if [ ! -f $CONFIG_FILE ]
  then
    echo -e "\nMissing ${RED}$CONFIG_FILE${NC} config file\n"
  exit 1
fi

# Change to script dir
cd "$(dirname "$0")"
source ./config-to-env.sh

# Export AWS Profile to use
export AWS_PROFILE=$PROFILE
export AWS_REGION=$REGION
export ABU_STAGE=$STAGE

# Change to root dir
cd ..

echo -e "\n${BLUE}Setting up infrastructure...${NC}\n"
yarn workspace infra cdk bootstrap
yarn workspace infra build
yarn workspace infra deploy

# Store configs
node scripts/cdk-to-config.js

echo -e "\n${BLUE}Setting up S3 and CloudFront for uploads...${NC}\n"
yarn workspace upload deploy $STAGE

# Store upload configs
node scripts/upload-to-config.js

# update lambda memory and timeout
./scripts/update-lambda-edge.sh $STAGE

echo -e "\n${BLUE}Setting up API...${NC}\n"
yarn deploy:api $STAGE

# Store upload configs
node scripts/api-to-config.js

# # Run deploy cms
yarn deploy:cms $STAGE

