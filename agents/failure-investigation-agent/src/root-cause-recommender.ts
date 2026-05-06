import Anthropic from '@anthropic-ai/sdk';
import { IAgent } from '../../../services/orchestrator-service/src/contracts/agent.interface';
import { AgentRequest } from '../../../services/orchestrator-service/src/contracts/agent-request';
import { AgentResponse } from '../../../services/orchestrator-service/src/contracts/agent-response';
import { ClassifiedFailure } from './failure-classifier';
import { LogAnalysis } from './log-analyser';
import { SYSTEM_PROMPTS } from '../../../shared/prompts/system-prompts';
import { config } from '../../../shared/config';

export interface RootCauseRecommendation {
  probableCause: string;
  confidence: number;
  remediationSteps: string[];
  jiraActionable: boolean;
  suggestedAssignee: string;
}

const client = new Anthropic();

export class RootCauseRecommender implements IAgent {
  readonly agentId = 'failure-investigation-agent';

  async execute(request: AgentRequest): Promise<AgentResponse> {
    const start = Date.now();
    const { failure, analysis } = request.input as { failure: ClassifiedFailure; analysis: LogAnalysis };
    const result = await this.recommend(failure, analysis);
    return {
      correlationId: request.correlationId,
      agentId: this.agentId,
      status: 'success',
      output: result as unknown as Record<string, unknown>,
      confidence: result.confidence,
      executionMs: Date.now() - start,
      completedAt: new Date()
    };
  }

  async healthCheck(): Promise<boolean> {
    return true;
  }

  async recommend(failure: ClassifiedFailure, analysis: LogAnalysis): Promise<RootCauseRecommendation> {
    const response = await client.messages.create({
      model: config.llm.model,
      max_tokens: 1024,
      system: SYSTEM_PROMPTS.failureInvestigation,
      messages: [{
        role: 'user',
        content: `Failure:\n${JSON.stringify(failure)}\n\nLog Analysis:\n${JSON.stringify(analysis)}`
      }]
    });

    const text = response.content[0].type === 'text' ? response.content[0].text : '{}';
    return JSON.parse(text);
  }
}