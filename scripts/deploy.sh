#!/bin/bash

S3_BUCKET_NAME=www.abu-cms.com
CF_ID=E2H0D5DAWV8NBL
WAIT_INV=ye

# Sync all files except for service-worker and index
echo "Uploading files to $S3_BUCKET_NAME..."
aws s3 sync packages/cms/build s3://$S3_BUCKET_NAME/ \
  --cache-control public,max-age=31536000 \
  --acl public-read \
  --exclude service-worker.js \
  --exclude index.html \
  --exclude .DS_Store \
  --delete \
  --profile dev

# Upload service-worker.js with directive to not cache it
echo "Uploading service-worker.js"
aws s3 cp packages/cms/build/service-worker.js s3://$S3_BUCKET_NAME/service-worker.js \
  --metadata-directive REPLACE \
  --cache-control max-age=0,no-cache,no-store,must-revalidate \
  --content-type application/javascript \
  --acl public-read \
  --profile dev

# Upload index.html
echo "Uploading index.html"
aws s3 cp packages/cms/build/index.html s3://$S3_BUCKET_NAME/index.html \
  --metadata-directive REPLACE \
  --cache-control max-age=0,no-cache,no-store,must-revalidate \
  --content-type text/html \
  --acl public-read \
  --profile dev

# Purge the cloudfront cache
echo "Purging the cache for CloudFront"
INVID=$(aws cloudfront create-invalidation \
  --distribution-id $CF_ID \
  --paths /* \
  --output text \
  --query 'Invalidation.Id \
  --profile dev')

if [ "$WAIT_INV" = "yes" ]; then
  echo "Waiting invalidation to complete"
  aws cloudfront wait invalidation-completed \
    --distribution-id $CF_ID \
    --id $INVID \
    --profile dev
fi
