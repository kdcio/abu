#!/bin/bash

aws cognito-idp delete-user-pool-domain \
    --user-pool-id $1 \
    --domain $2 \
    --profile $3