import Anthropic from '@anthropic-ai/sdk';
import { IAgent } from '../../../services/orchestrator-service/src/contracts/agent.interface';
import { AgentRequest } from '../../../services/orchestrator-service/src/contracts/agent-request';
import { AgentResponse } from '../../../services/orchestrator-service/src/contracts/agent-response';
import { Requirement, ParsedRequirement } from '../../../shared/types/requirement.types';
import { SYSTEM_PROMPTS } from '../../../shared/prompts/system-prompts';
import { config } from '../../../shared/config';

const client = new Anthropic();

export class RequirementParser implements IAgent {
  readonly agentId = 'requirement-understanding-agent';

  async execute(request: AgentRequest): Promise<AgentResponse> {
    const start = Date.now();
    const requirement = request.input as unknown as Requirement;
    const result = await this.parse(requirement);
    return {
      correlationId: request.correlationId,
      agentId: this.agentId,
      status: 'success',
      output: result as unknown as Record<string, unknown>,
      confidence: 0.92,
      executionMs: Date.now() - start,
      completedAt: new Date()
    };
  }

  async healthCheck(): Promise<boolean> {
    return true;
  }

  async parse(requirement: Requirement): Promise<ParsedRequirement> {
    const response = await client.messages.create({
      model: config.llm.model,
      max_tokens: config.llm.maxTokens,
      system: SYSTEM_PROMPTS.requirementUnderstanding,
      messages: [{
        role: 'user',
        content: `Parse this JIRA requirement:\n\nTitle: ${requirement.title}\nDescription: ${requirement.description}\nAcceptance Criteria:\n${requirement.acceptanceCriteria.join('\n')}`
      }]
    });

    const content = response.content[0];
    if (content.type !== 'text') throw new Error('Unexpected response type');
    const parsed = JSON.parse(content.text);

    return {
      ...requirement,
      testableScenarios: parsed.testableScenarios || [],
      edgeCases: parsed.edgeCases || [],
      automationCandidates: parsed.automationCandidates || []
    };
  }
}