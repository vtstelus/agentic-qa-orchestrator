export interface AgentError {
  correlationId: string;
  agentId: string;
  errorCode: string;
  message: string;
  retryable: boolean;
  failedAt: Date;
}