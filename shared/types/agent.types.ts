export interface AgentInput {
  correlationId: string;
  source: 'jira' | 'github' | 'cicd' | 'manual';
  payload: Record<string, unknown>;
  triggeredAt: Date;
}
export interface AgentOutput {
  correlationId: string;
  agentId: string;
  status: 'success' | 'partial' | 'failed';
  result: Record<string, unknown>;
  confidence: number;
  executionMs: number;
  completedAt: Date;
}
export interface AgentConfig {
  agentId: string;
  model: string;
  maxTokens: number;
  temperature: number;
  retryPolicy: { maxRetries: number; backoffMs: number };
}
