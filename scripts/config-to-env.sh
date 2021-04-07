#!/bin/bash

PROJECT_MATCH="PROJECT_NAME: "
PROJECT=$(grep "$PROJECT_MATCH" ../config/$STAGE.yml | sed -e "s/^$PROJECT_MATCH//")

REGION_MATCH="REGION: "
REGION=$(grep "$REGION_MATCH" ../config/$STAGE.yml | sed -e "s/^$REGION_MATCH//")

PROFILE_MATCH="PROFILE: "
PROFILE=$(grep "$PROFILE_MATCH" ../config/$STAGE.yml | sed -e "s/^$PROFILE_MATCH//")
