#!/bin/bash
set -e
echo "🤖 Starting all agents..."
docker-compose up -d
echo "✅ Services running. API Gateway: http://localhost:3000"
