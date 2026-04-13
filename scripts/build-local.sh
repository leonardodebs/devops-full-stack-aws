#!/bin/bash
set -euo pipefail

echo "🔨 Building and running local environment..."

cd docker
docker compose up --build -d

echo "✅ Application running at http://localhost:8000"
echo "📊 Prometheus running at http://localhost:9090"
echo "📈 Grafana running at http://localhost:3001"
