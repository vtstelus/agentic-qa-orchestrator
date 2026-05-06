export interface AgentResponse {
  correlationId: string;
  agentId: string;
  status: 'success' | 'partial' | 'failed';
  output: Record<string, unknown>;
  confidence: number;
  executionMs: number;
  completedAt: Date;
}