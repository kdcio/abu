#!/bin/bash

STACK_NAME=abu-s3-cf-$STAGE
STACK_DESC=$(aws cloudformation describe-stacks --stack-name $STACK_NAME --output text --profile $PROFILE --region $REGION)

SEARCH_KEY="AbuCFEndpoint"
CF_ENDPOINT=$(echo "$STACK_DESC" | grep $SEARCH_KEY | awk 'END {print $4}')

SEARCH_KEY="AbuCFDistributionId"
CF_ID=$(echo "$STACK_DESC" | grep $SEARCH_KEY | awk 'END {print $4}')

