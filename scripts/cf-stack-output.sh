#!/bin/bash

STACK_NAME=abu-s3-cf-$STAGE
STACK_DESC=$(aws cloudformation describe-stacks --stack-name $STACK_NAME --output text --profile $PROFILE --region $REGION)

SEARCH_KEY="AbuCFEndpointWWW"
CF_ENDPOINT=$(echo "$STACK_DESC" | grep $SEARCH_KEY | awk 'END {print $4}')

SEARCH_KEY="AbuCFDistributionIdWWW"
CF_ID=$(echo "$STACK_DESC" | grep $SEARCH_KEY | awk 'END {print $4}')

