#!/bin/bash

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

function help {
    echo -e "\nUsage: create-user.sh ${BLUE}<stage> <email> [group]${NC}\n"
    echo -e "This script will create a user in your existing cognito.\n"
    echo -e "Arguments:"
    echo -e "  stage\t\tDeployment stage"
    echo -e "  email\t\tEmail address of user"
    echo -e "  group\t\tGroup permission. Possible values: admin or editor\n"
    echo -e "Example: create-user.sh staging jon@doe.com editor\n"
}

if [ -z "$1" ]; then
  help
  exit 0
fi

if [ "$1" = "--help" ]; then
  help
  exit 0
fi

if [ -z "$2" ]; then
    echo -e "\nMissing ${RED}email${NC}"
  help
  exit 1
fi

if [ -z "$3" ]; then
  # Default group
  GROUP='editor'
else
  GROUP=$3
fi

STAGE=$1
EMAIL=$2

regex="^(([A-Za-z0-9]+((\.|\-|\_|\+)?[A-Za-z0-9]?)*[A-Za-z0-9]+)|[A-Za-z0-9]+)@(([A-Za-z0-9]+)+((\.|\-|\_)?([A-Za-z0-9]+)+)*)+\.([A-Za-z]{2,})+$"

if [[ ! $EMAIL =~ ${regex} ]]; then
  echo -e "\nInvalid email: ${RED}${EMAIL}${NC}\n"
  exit 1
fi

cd "$(dirname "$0")"
source ./pool-id.sh

echo -e "\n${BLUE}Create cognito user...${NC}\n"
aws cognito-idp admin-create-user \
    --profile $PROFILE \
    --region $REGION \
    --user-pool-id $POOL_ID \
    --username $2

echo -e "\n${BLUE}Add user to group...${NC}\n"
aws cognito-idp admin-add-user-to-group \
    --profile $PROFILE \
    --region $REGION \
    --user-pool-id $POOL_ID \
    --group-name $GROUP \
    --username $2

echo -e "\n\n${GREEN}Cognito user${NC} ${BLUE}$EMAIL${NC} ${GREEN}created!!!${NC}\n"
echo -e "A temporary password has been sent to your email. You can now login to your AbuCMS.\n"
