#!/bin/bash

SEARCH_KEY="PROJECT_NAME: "
PROJECT=$(grep "$SEARCH_KEY" ../config/$STAGE.yml | sed -e "s/^$SEARCH_KEY//")

SEARCH_KEY="UPLOAD_BUCKET: "
UPLOAD_BUCKET=$(grep "$SEARCH_KEY" ../config/$STAGE.yml | sed -e "s/^$SEARCH_KEY//")

SEARCH_KEY="REGION: "
REGION=$(grep "$SEARCH_KEY" ../config/$STAGE.yml | sed -e "s/^$SEARCH_KEY//")

SEARCH_KEY="PROFILE: "
PROFILE=$(grep "$SEARCH_KEY" ../config/$STAGE.yml | sed -e "s/^$SEARCH_KEY//")
