#!/bin/bash

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

export STAGE=local
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
node scripts/cdk-to-config-local.js

# Setup local dynamodb
yarn workspace infra setup:local:ddb

echo -e "${GREEN}Local Setup Success!!!${NC}\n"