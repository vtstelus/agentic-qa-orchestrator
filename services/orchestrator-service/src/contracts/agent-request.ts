export interface AgentRequest {
  correlationId: string;
  agentId: string;
  input: Record<string, unknown>;
  context: {
    releaseVersion: string;
    triggeredBy: 'jira' | 'github' | 'cicd' | 'manual';
    priority: 'critical' | 'high' | 'medium' | 'low';
    squadId?: string;
  };
  timeoutMs: number;
}