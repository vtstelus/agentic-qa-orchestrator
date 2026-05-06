# Architecture Decision Records

## ADR-001: Multi-Agent Orchestration Pattern
**Status:** Accepted | **Date:** Feb 2026

### Context
QA processes involve distinct concerns (requirement analysis, test design, execution, triage) that benefit from specialisation.

### Decision
Adopt a multi-agent architecture with a central AI Orchestrator coordinating specialised agents.

### Consequences
+ Each agent can be independently scaled, tested, and improved
+ Clear separation of concerns
- Increased operational complexity

---

## ADR-002: TypeScript Monorepo
**Status:** Accepted | **Date:** Feb 2026

### Decision
Use TypeScript with Turborepo for all services and agents.

### Consequences
+ Shared types across agents prevent integration bugs
+ Single repo simplifies CI/CD

---

## ADR-003: Trust Layer with Human-in-the-Loop
**Status:** Accepted | **Date:** Feb 2026

### Decision
All agent outputs pass through a confidence-based trust gate before actioning.

### Consequences
+ Prevents low-confidence results from reaching production pipelines
+ Human review queue provides auditability
