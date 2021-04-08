#!/bin/bash

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

if [ -z "$1" ]
  then
    echo -e "\nThis script will remove ALL resources that was created by the setup script.\n"
    echo -e "Usage: uninstall.sh ${BLUE}<stage>${NC}\n"
    echo -e "Example: uninstall.sh prod\n"
  exit 1
fi

STAGE=$1

echo -e "\n\n${RED}DANGER: THIS CANNOT BE UNDONE!!!${NC}"
echo -e "\n\n${RED}DANGER: ALL YOUR DATA WILL BE LOST AND CANNOT BE RECOVERED!!!${NC}\n\n"
read -p "Are you sure? " -n 1 -r
echo    # (optional) move to a new line
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo -e "\n${GREEN}Whew! I thought you were serious. :)${NC}\n"
    exit 0
fi

cd "$(dirname "$0")"
source ./config-to-env.sh
source ./cf-stack-output.sh
source ./pool-id.sh

echo -e "\n${BLUE}Removing all files from bucket...${NC}\n"
aws s3 rm s3://$PROJECT \
    --recursive \
    --profile $PROFILE

echo -e "\n${BLUE}Removing all files from upload bucket...${NC}\n"
aws s3 rm s3://$UPLOAD_BUCKET \
    --recursive \
    --profile $PROFILE

# Get Cognito pool client domain
SEARCH_KEY="AbuCognitoUserPoolClientDomain-$STAGE"
COG_DOMAIN=$(echo "$EXP_LIST" | grep $SEARCH_KEY | awk 'END {print $4}' | sed -r 's/[\.]+/\-/g')

echo -e "\n${BLUE}Removing cognito pool client domain...${NC}\n"
aws cognito-idp delete-user-pool-domain \
    --user-pool-id $POOL_ID \
    --domain $COG_DOMAIN \
    --profile $PROFILE

echo -e "\n${BLUE}Removing cognito...${NC}\n"
yarn workspace res delete:cog $STAGE

echo -e "\n${BLUE}Removing DynamoDB...${NC}\n"
yarn workspace res delete:ddb $STAGE

echo -e "\n${BLUE}Removing CMS S3 and CloudFront...${NC}\n"
yarn workspace res delete:s3-cf $STAGE

echo -e "\n${BLUE}Removing Upload S3 and CloudFront...${NC}\n"
yarn workspace upload delete $STAGE

echo -e "\n${BLUE}Removing API...${NC}\n"
yarn delete:api $STAGE

echo -e "\n${BLUE}Removing CloudFront lambda function...${NC}\n"
aws lambda delete-function \
    --function-name abu-upload-$STAGE-origin-request \
    --region us-east-1 \
    --profile $PROFILE

echo -e "${GREEN}Uninstall Success!!!${NC}\n"

