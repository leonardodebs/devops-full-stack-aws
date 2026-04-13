#!/bin/bash
set -euo pipefail

echo "🚀 Starting initial setup..."

# Create S3 bucket for Terraform state if it doesn't exist
BUCKET_NAME="devops-fullstack-aws-tfstate"
REGION="us-east-1"

if aws s3api head-bucket --bucket "$BUCKET_NAME" 2>/dev/null; then
    echo "✅ Bucket $BUCKET_NAME already exists."
else
    echo "📦 Creating S3 bucket $BUCKET_NAME..."
    aws s3api create-bucket --bucket "$BUCKET_NAME" --region "$REGION"
    aws s3api put-bucket-versioning --bucket "$BUCKET_NAME" --versioning-configuration Status=Enabled
fi

# Create DynamoDB table for locking
TABLE_NAME="terraform-lock"
if aws dynamodb describe-table --table-name "$TABLE_NAME" 2>/dev/null; then
    echo "✅ DynamoDB table $TABLE_NAME already exists."
else
    echo "🔑 Creating DynamoDB table $TABLE_NAME..."
    aws dynamodb create-table \
        --table-name "$TABLE_NAME" \
        --attribute-definitions AttributeName=LockID,AttributeType=S \
        --key-schema AttributeName=LockID,KeyType=HASH \
        --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5
fi

echo "✨ Setup complete!"
