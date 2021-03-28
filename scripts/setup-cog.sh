#!/bin/bash

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

if [ -z "$1" ]
  then
    echo -e "\nThis script will provision Cognitor resources in AWS and create the first user.\n"
    echo -e "Usage: ./setup-cog.sh ${BLUE}<stage> <email>${NC}\n"
    echo -e "Example: ./setup-cog.sh staging jon@doe.com\n"
  exit 1
fi

if [ -z "$2" ]
  then
    echo -e "\nMissing ${RED}email${NC}\n"
  exit 1
fi

STAGE=$1
EMAIL=$2

echo -e "\n${BLUE}Setting up cognito...${NC}\n"
yarn workspace res setup:cog $STAGE

./scripts/create-user.sh $STAGE $EMAIL

echo -e "${GREEN}Setup Cognito Success!!!${NC}\n"
