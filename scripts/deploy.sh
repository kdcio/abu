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
    echo -e "Usage: deploy.sh ${BLUE}<stage> <email>${NC}\n"
    echo -e "Example: deploy.sh prod jon@doe.com\n"
  exit 1
fi

STAGE=$1
CONFIG_FILE=./config/$STAGE.yml

if [ ! -f $CONFIG_FILE ]
  then
    echo -e "\nMissing ${RED}$CONFIG_FILE${NC} config file\n"
  exit 1
fi

if [ -z "$2" ]
  then
    echo -e "\nMissing ${RED}email${NC}\n"
  exit 1
fi

EMAIL=$2

# Run setup
./scripts/setup-stage.sh $STAGE $EMAIL

# Run deploy api
yarn deploy:api prod

# Run deploy cms
yarn deploy:cms prod

