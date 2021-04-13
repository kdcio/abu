#!/bin/bash

STAGE=$1

FUNCTION_NAME=abu-upload-$STAGE-origin-request
for region in $(aws --output text  ec2 describe-regions --profile dev | cut -f 4)
do
    echo "Region $region"
    for loggroup in $(aws --output text \
                      logs describe-log-groups \
                      --log-group-name "/aws/lambda/us-east-1.$FUNCTION_NAME" \
                      --region $region \
                      --query 'logGroups[].logGroupName' \
                      --profile dev)
    do
        echo $region $loggroup
    done
done