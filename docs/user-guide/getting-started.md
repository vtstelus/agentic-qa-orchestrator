# Getting Started

## Triggering a QA Workflow

1. **Via JIRA webhook** — configure your JIRA project to POST to `/api/v1/orchestrator/trigger` on story transitions
2. **Via GitHub Actions** — add the provided workflow template to `.github/workflows/`
3. **Via API** — POST manually with `curl`:

```bash
curl -X POST http://localhost:3000/api/v1/orchestrator/trigger \
  -H "x-api-key: your-key" \
  -H "Content-Type: application/json" \
  -d '{"source":"jira","payload":{"issueKey":"PROJ-123"}}'
```

## Reading the Release Intelligence Report
The report appears in:
- Slack (`#qa-reports` channel)
- Confluence (auto-published)
- Web dashboard (`http://localhost:3000`)
