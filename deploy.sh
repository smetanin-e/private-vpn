#!/bin/bash
set -e

echo "----------------------------------------"
echo "🚀 Starting deploy..."
echo "----------------------------------------"


echo "🔧 Building Docker images..."
docker compose --env-file .env build

echo "🛑 Stopping old containers..."
docker compose --env-file .env down

echo "🌟 Starting new containers..."
docker compose --env-file .env up -d

echo "----------------------------------------"
echo "✅ Deploy complete!"
echo "----------------------------------------"