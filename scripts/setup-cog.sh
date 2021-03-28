#!/bin/bash

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
Blue='\033[0;34m'
NC='\033[0m' # No Color

if [ -z "$1" ]
  then
    echo -e "\nThis script will provision Cognitor resources in AWS and create the first user.\n"
    echo -e "Usage: ./setup-cog.sh ${Blue}<stage> <email>${NC}\n"
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
POOL_KEY="AbuCognitoUserPoolId-$STAGE"

regex="^(([A-Za-z0-9]+((\.|\-|\_|\+)?[A-Za-z0-9]?)*[A-Za-z0-9]+)|[A-Za-z0-9]+)@(([A-Za-z0-9]+)+((\.|\-|\_)?([A-Za-z0-9]+)+)*)+\.([A-Za-z]{2,})+$"

if [[ ! $EMAIL =~ ${regex} ]]; then
  echo -e "\nInvalid email: ${RED}${EMAIL}${NC}\n"
  exit 1
fi


REGION_MATCH="REGION: "
REGION=$(grep "$REGION_MATCH" config/$STAGE.yml | sed -e "s/^$REGION_MATCH//")

PROFILE_MATCH="PROFILE: "
PROFILE=$(grep "$PROFILE_MATCH" config/$STAGE.yml | sed -e "s/^$PROFILE_MATCH//")

echo -e "\n${Blue}Setting up cognito...${NC}\n"
yarn workspace res setup:cog dev

# Get export list
EXP_LIST=$(aws cloudformation list-exports --output text --profile $PROFILE --region $REGION)

# Get Pool Id
POOL_ID=$(echo "$EXP_LIST" | grep $POOL_KEY | awk 'END {print $4}')

echo -e "\n${Blue}Create cognito user...${NC}\n"
aws cognito-idp admin-create-user \
    --profile $PROFILE \
    --region $REGION \
    --user-pool-id $POOL_ID \
    --username $2

echo -e "\n\n${GREEN}Setup Cognito Success!!!${NC}\n"
echo -e "A temporary password has been sent to your email. You can now login to your AbuCMS.\n"
