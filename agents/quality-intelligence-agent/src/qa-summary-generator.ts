import Anthropic from '@anthropic-ai/sdk';
import { IAgent } from '../../../services/orchestrator-service/src/contracts/agent.interface';
import { AgentRequest } from '../../../services/orchestrator-service/src/contracts/agent-request';
import { AgentResponse } from '../../../services/orchestrator-service/src/contracts/agent-response';
import { ReleaseIntelligenceReport } from '../../../shared/types/report.types';
import { SYSTEM_PROMPTS } from '../../../shared/prompts/system-prompts';
import { config } from '../../../shared/config';

const client = new Anthropic();

export class QASummaryGenerator implements IAgent {
  readonly agentId = 'quality-intelligence-agent';

  async execute(request: AgentRequest): Promise<AgentResponse> {
    const start = Date.now();
    const data = request.input as Partial<ReleaseIntelligenceReport>;
    const result = await this.generate(data);
    return {
      correlationId: request.correlationId,
      agentId: this.agentId,
      status: 'success',
      output: result as unknown as Record<string, unknown>,
      confidence: 0.91,
      executionMs: Date.now() - start,
      completedAt: new Date()
    };
  }

  async healthCheck(): Promise<boolean> {
    return true;
  }

  async generate(data: Partial<ReleaseIntelligenceReport>): Promise<ReleaseIntelligenceReport> {
    const response = await client.messages.create({
      model: config.llm.model,
      max_tokens: config.llm.maxTokens,
      system: SYSTEM_PROMPTS.qualityIntelligence,
      messages: [{
        role: 'user',
        content: `Generate release intelligence report:\n${JSON.stringify(data)}`
      }]
    });

    const text = response.content[0].type === 'text' ? response.content[0].text : '{}';
    return JSON.parse(text);
  }
}