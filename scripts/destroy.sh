#!/bin/bash
set -euo pipefail

echo "⚠️  WARNING: This will destroy all infrastructure in AWS."
read -p "Are you sure you want to proceed? (y/N) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
    echo "🔥 Destroying infrastructure..."
    cd terraform/environments/dev
    terraform destroy -auto-approve
else
    echo "❌ Operation cancelled."
fi
