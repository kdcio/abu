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

yarn workspace infra destroy

yarn destroy:api $STAGE

yarn destroy:upload $STAGE