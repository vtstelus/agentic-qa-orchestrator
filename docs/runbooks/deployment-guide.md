# Deployment Guide

## Prerequisites
- Docker 24+, Node.js 20+, kubectl configured

## Local Development
```bash
./scripts/setup-env.sh
docker-compose up -d
npm run dev
```

## Production Deployment
```bash
# Build and push image
docker build -t agentic-qa-orchestrator:v1.0.0 .
docker push your-registry/agentic-qa-orchestrator:v1.0.0

# Deploy to Kubernetes
kubectl apply -f infra/kubernetes/
kubectl rollout status deployment/orchestrator
```

## Environment Variables
See `.env.example` for all required configuration.
