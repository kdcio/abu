#!/bin/bash

SEARCH_KEY="PROJECT_NAME: "
export PROJECT=$(grep "$SEARCH_KEY" ../config/$STAGE.yml | sed -e "s/^$SEARCH_KEY//")

SEARCH_KEY="UPLOAD_BUCKET: "
export UPLOAD_BUCKET=$(grep "$SEARCH_KEY" ../config/$STAGE.yml | sed -e "s/^$SEARCH_KEY//")

SEARCH_KEY="REGION: "
export REGION=$(grep "$SEARCH_KEY" ../config/$STAGE.yml | sed -e "s/^$SEARCH_KEY//")

SEARCH_KEY="PROFILE: "
export PROFILE=$(grep "$SEARCH_KEY" ../config/$STAGE.yml | sed -e "s/^$SEARCH_KEY//")

SEARCH_KEY="FIRST_USER_EMAIL: "
export FIRST_USER_EMAIL=$(grep "$SEARCH_KEY" ../config/$STAGE.yml | sed -e "s/^$SEARCH_KEY//")
