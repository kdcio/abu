#!/bin/bash

STAGE=$1
FUNC=$2

if [ -n "$FUNC" ]; then
    yarn deploy:api:func -s $STAGE -f $FUNC
else
    yarn deploy:api:all $STAGE
    ./scripts/api-endpoint.sh
fi
