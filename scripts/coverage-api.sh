#!/bin/sh

echo "Clean up"
rm -fR coverage

mkdir coverage

echo "Merging reports..."
npm exec -- istanbul-merge \
  --out coverage/coverage.json \
  packages/cognito/coverage/coverage-final.json \
  packages/model/coverage/coverage-final.json \
  packages/api-users/coverage/coverage-final.json \
  packages/api-model/coverage/coverage-final.json

echo "Converting report to html..."
npm exec -- istanbul report --include coverage/coverage.json --dir coverage/html html

echo "Done"