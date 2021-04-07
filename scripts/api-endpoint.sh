#!/bin/sh

STAGE=$1
cd "$(dirname "$0")"
source ./config-to-env.sh

STACK_NAME=abu-api-$STAGE
STACK_DESC=$(aws cloudformation describe-stacks --stack-name $STACK_NAME --output text --profile $PROFILE --region $REGION)

SEARCH_KEY="ServiceEndpoint"
API_ENDPOINT=$(echo "$STACK_DESC" | grep $SEARCH_KEY | awk 'END {print $8}')

ENV_FILE="../packages/cms/.env.production"
echo "REACT_APP_API_ENDPOINT=$API_ENDPOINT" >> $ENV_FILE