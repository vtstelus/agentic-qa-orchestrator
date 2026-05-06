#!/bin/bash
set -e
echo "🔧 Setting up Agentic QA Orchestrator environment..."
cp .env.example .env
npm install
echo "✅ Setup complete. Edit .env and run: docker-compose up -d"
