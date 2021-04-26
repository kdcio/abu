#!/bin/bash

STAGE=$1

# Ensure upload origin-request have correct config
# On first deploy, the lambda edge fuction only have 5sec timeout
# and 128MB of memoery
yarn workspace upload deploy:func -s $STAGE -f origin-request

# Redploy whole upload stack for memory and timeout to take effect
yarn workspace upload deploy $STAGE
