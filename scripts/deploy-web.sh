#!/bin/bash

STAGE=$1

SEARCH_KEY="PROJECT_NAME: "
PROJECT=$(grep "$SEARCH_KEY" ./config/$STAGE.yml | sed -e "s/^$SEARCH_KEY//")

SEARCH_KEY="PROFILE: "
PROFILE=$(grep "$SEARCH_KEY" ./config/$STAGE.yml | sed -e "s/^$SEARCH_KEY//")

SEARCH_KEY="CF_ID: "
CF_ID=$(grep "$SEARCH_KEY" ./config/$STAGE.yml | sed -e "s/^$SEARCH_KEY//")

S3_BUCKET_NAME=$PROJECT
CF_ID=$CF_ID
WAIT_INV=yes

# Build CMS
yarn workspace cms build

# Sync all files except for service-worker and index
echo "Uploading files to $S3_BUCKET_NAME..."
aws s3 sync packages/cms/build s3://$S3_BUCKET_NAME/ \
  --cache-control public,max-age=31536000 \
  --acl public-read \
  --exclude service-worker.js \
  --exclude index.html \
  --exclude .DS_Store \
  --delete \
  --profile $PROFILE

# Upload service-worker.js with directive to not cache it
echo "Uploading service-worker.js"
aws s3 cp packages/cms/build/service-worker.js s3://$S3_BUCKET_NAME/service-worker.js \
  --metadata-directive REPLACE \
  --cache-control max-age=0,no-cache,no-store,must-revalidate \
  --content-type application/javascript \
  --acl public-read \
  --profile $PROFILE

# Upload index.html
echo "Uploading index.html"
aws s3 cp packages/cms/build/index.html s3://$S3_BUCKET_NAME/index.html \
  --metadata-directive REPLACE \
  --cache-control max-age=0,no-cache,no-store,must-revalidate \
  --content-type text/html \
  --acl public-read \
  --profile $PROFILE

# Purge the cloudfront cache
echo "Purging the cache for CloudFront"
INVID=$(aws cloudfront create-invalidation \
  --distribution-id $CF_ID \
  --paths /* \
  --output text \
  --query 'Invalidation.Id' \
  --profile $PROFILE)

if [ "$WAIT_INV" = "yes" ]; then
  echo "Waiting invalidation to complete"
  aws cloudfront wait invalidation-completed \
    --distribution-id $CF_ID \
    --id $INVID \
    --profile $PROFILE
fi
