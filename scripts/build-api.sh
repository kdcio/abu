#!/bin/sh

yarn workspace cognito build
yarn workspace model build
yarn workspace authorizer build
# yarn workspace api-user build
# yarn workspace api-model build
# yarn workspace api-content build
# yarn workspace api-access build