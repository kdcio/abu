#!/bin/bash

STAGE=$1

# Ensure upload origin-request have correct config
# On first deploy, the lambda edge fuction only have 5sec timeout
# and 128MB of memoery
yarn workspace upload deploy:func -s $STAGE -f origin-request

# TODO: We still need to redeploy lambda edge function via AWS Console