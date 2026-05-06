import Anthropic from '@anthropic-ai/sdk';
import { IAgent } from '../../../services/orchestrator-service/src/contracts/agent.interface';
import { AgentRequest } from '../../../services/orchestrator-service/src/contracts/agent-request';
import { AgentResponse } from '../../../services/orchestrator-service/src/contracts/agent-response';
import { ParsedRequirement } from '../../../shared/types/requirement.types';
import { SYSTEM_PROMPTS } from '../../../shared/prompts/system-prompts';
import { config } from '../../../shared/config';

export interface TestCase {
  id: string;
  title: string;
  type: 'happy-path' | 'negative' | 'edge-case' | 'regression' | 'performance';
  steps: string[];
  expectedResult: string;
  priority: 'P0' | 'P1' | 'P2' | 'P3';
  automatable: boolean;
}

const client = new Anthropic();

export class TestCaseGenerator implements IAgent {
  readonly agentId = 'test-design-agent';

  async execute(request: AgentRequest): Promise<AgentResponse> {
    const start = Date.now();
    const requirement = request.input as unknown as ParsedRequirement;
    const result = await this.generate(requirement);
    return {
      correlationId: request.correlationId,
      agentId: this.agentId,
      status: 'success',
      output: { testCases: result } as unknown as Record<string, unknown>,
      confidence: 0.90,
      executionMs: Date.now() - start,
      completedAt: new Date()
    };
  }

  async healthCheck(): Promise<boolean> {
    return true;
  }

  async generate(requirement: ParsedRequirement): Promise<TestCase[]> {
    const response = await client.messages.create({
      model: config.llm.model,
      max_tokens: config.llm.maxTokens,
      system: SYSTEM_PROMPTS.testDesign,
      messages: [{
        role: 'user',
        content: `Generate test cases for:\n${JSON.stringify(requirement, null, 2)}`
      }]
    });

    const content = response.content[0];
    if (content.type !== 'text') throw new Error('Unexpected response');
    return JSON.parse(content.text);
  }
}