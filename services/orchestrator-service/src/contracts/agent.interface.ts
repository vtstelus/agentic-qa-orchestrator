import { AgentRequest } from './agent-request';
import { AgentResponse } from './agent-response';

export interface IAgent {
  readonly agentId: string;
  execute(request: AgentRequest): Promise<AgentResponse>;
  healthCheck(): Promise<boolean>;
}