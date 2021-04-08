#!/bin/bash

# Get export list
EXP_LIST=$(aws cloudformation list-exports --output text --profile $PROFILE --region $REGION)

# Get Pool Id
POOL_KEY="AbuCognitoUserPoolId-$STAGE"
POOL_ID=$(echo "$EXP_LIST" | grep $POOL_KEY | awk 'END {print $4}')

