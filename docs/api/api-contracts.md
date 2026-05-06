# API Contracts

## POST /api/v1/orchestrator/trigger
Triggers a QA workflow from an engineering signal.

**Request:**
```json
{
  "source": "jira",
  "payload": {
    "issueKey": "PROJ-123",
    "priority": "critical"
  }
}
```

**Response:**
```json
{
  "correlationId": "uuid-v4",
  "status": "queued",
  "estimatedDurationMs": 120000
}
```

## GET /api/v1/orchestrator/status/:correlationId
Returns the current status of a triggered workflow.

## GET /api/v1/reports/:releaseVersion
Returns the Release Intelligence Report for a given release version.
