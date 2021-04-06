#!/bin/bash

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

if [ -z "$1" ]
  then
    echo -e "\nThis script will provision resources needed to run this CMS.\n"
    echo -e "Usage: setup-local.sh ${BLUE}<email>${NC}\n"
    echo -e "Example: setup-local.sh jon@doe.com\n"
  exit 1
fi

if [ -z "$1" ]
  then
    echo -e "\nMissing ${RED}email${NC}\n"
  exit 1
fi

STAGE=dev

cd "$(dirname "$0")"
./setup-cog.sh $STAGE $1

# Write additional cms env
echo "REACT_APP_AUTH_OAUTH_SIGNIN=http://localhost:8060" >> ../packages/cms/.env
echo "REACT_APP_AUTH_OAUTH_SIGNOUT=http://localhost:8060" >> ../packages/cms/.env
echo "REACT_APP_API_ENDPOINT=http://localhost:8061" >> ../packages/cms/.env


echo -e "${GREEN}Local Setup Success!!!${NC}\n"