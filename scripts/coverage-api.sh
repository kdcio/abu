#!/bin/sh

echo "Clean up"
rm -fR coverage

mkdir coverage

echo "Merging reports..."
npm exec -- istanbul-merge \
  --out coverage/coverage.json \
  packages/authorizer/coverage/coverage-final.json \
  packages/cognito/coverage/coverage-final.json \
  packages/model/coverage/coverage-final.json \
  packages/api-admin-access/coverage/coverage-final.json \
  packages/api-admin-content/coverage/coverage-final.json \
  packages/api-admin-model/coverage/coverage-final.json \
  packages/api-admin-user/coverage/coverage-final.json \
  packages/api-content/coverage/coverage-final.json \
  packages/upload/coverage/coverage-final.json

echo "Converting report to html..."
npm exec -- istanbul report --include coverage/coverage.json --dir coverage/html html

echo "Done"