#!/bin/bash

REGION_MATCH="REGION: "
REGION=$(grep "$REGION_MATCH" ../config/$STAGE.yml | sed -e "s/^$REGION_MATCH//")

PROFILE_MATCH="PROFILE: "
PROFILE=$(grep "$PROFILE_MATCH" ../config/$STAGE.yml | sed -e "s/^$PROFILE_MATCH//")

# Get export list
EXP_LIST=$(aws cloudformation list-exports --output text --profile $PROFILE --region $REGION)

# Get Pool Id
POOL_KEY="AbuCognitoUserPoolId-$STAGE"
POOL_ID=$(echo "$EXP_LIST" | grep $POOL_KEY | awk 'END {print $4}')

