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

cd "$(dirname "$0")"
source ./config-to-env.sh
source ./pool-id.sh

# Get Cognito pool client id
COG_POOL_CLIENT_ID_KEY="AbuCognitoUserPoolClientId-$STAGE"
COG_POOL_CLIENT_ID=$(echo "$EXP_LIST" | grep $COG_POOL_CLIENT_ID_KEY | awk 'END {print $4}')

# Get Cognito pool client domain
COG_POOL_CLIENT_DOMAIN_KEY="AbuCognitoUserPoolClientDomain-$STAGE"
COG_POOL_CLIENT_DOMAIN=$(echo "$EXP_LIST" | grep $COG_POOL_CLIENT_DOMAIN_KEY | awk 'END {print $4}')

# Write Cognito info to config
echo "COG_POOL_ID: $POOL_ID" >> ../config/$STAGE.yml
# Write Cognito info to cms .env
echo "REACT_APP_AUTH_AWS_REGION=$REGION" >> $ENV_FILE
echo "REACT_APP_AUTH_POOL_ID=$POOL_ID" >> $ENV_FILE
echo "REACT_APP_AUTH_CLIENT_ID=$COG_POOL_CLIENT_ID" >> $ENV_FILE
echo "REACT_APP_AUTH_OAUTH_DOMAIN=$COG_POOL_CLIENT_DOMAIN.auth.$REGION.amazoncognito.com" >> $ENV_FILE

# Get Cognito user access key
COG_USER_ACCESS_KEY="AbuCognitoUserAccessKey-$STAGE"
COG_ACCESS=$(echo "$EXP_LIST" | grep $COG_USER_ACCESS_KEY | awk 'END {print $4}')

# Get Cognito user secret access key
COG_USER_SECRET_KEY="AbuCognitoUserSecretKey-$STAGE"
COG_SECRET=$(echo "$EXP_LIST" | grep $COG_USER_SECRET_KEY | awk 'END {print $4}')

# Write cognito user credentials to config
echo "COG_ACCESS_KEY_ID: $COG_ACCESS" >> ../config/$STAGE.yml
echo "COG_SECRET_ACCESS_KEY: $COG_SECRET" >> ../config/$STAGE.yml

echo -e "\n${BLUE}Creating cognito groups...${NC}\n"
# Create cognito admin group
aws cognito-idp create-group \
    --profile $PROFILE \
    --region $REGION \
    --user-pool-id $POOL_ID \
    --group-name admin
# Create cognito editor group
aws cognito-idp create-group \
    --profile $PROFILE \
    --region $REGION \
    --user-pool-id $POOL_ID \
    --group-name editor

./create-user.sh $STAGE $EMAIL admin

echo -e "${GREEN}Setup Cognito Success!!!${NC}\n"
