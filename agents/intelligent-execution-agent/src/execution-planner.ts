import { IAgent } from '../../../services/orchestrator-service/src/contracts/agent.interface';
import { AgentRequest } from '../../../services/orchestrator-service/src/contracts/agent-request';
import { AgentResponse } from '../../../services/orchestrator-service/src/contracts/agent-response';
import { TestCase } from '../../test-design-agent/src/test-case-generator';

export interface ExecutionPlan {
  totalTests: number;
  parallel: TestCase[][];
  sequential: TestCase[];
  estimatedDurationMs: number;
}

export class ExecutionPlanner implements IAgent {
  readonly agentId = 'intelligent-execution-agent';

  async execute(request: AgentRequest): Promise<AgentResponse> {
    const start = Date.now();
    const testCases = request.input as unknown as TestCase[];
    const result = this.plan(testCases);
    return {
      correlationId: request.correlationId,
      agentId: this.agentId,
      status: 'success',
      output: result as unknown as Record<string, unknown>,
      confidence: 0.95,
      executionMs: Date.now() - start,
      completedAt: new Date()
    };
  }

  async healthCheck(): Promise<boolean> {
    return true;
  }

  plan(testCases: TestCase[], maxParallelWorkers = 4): ExecutionPlan {
    const automatable = testCases.filter(tc => tc.automatable);
    const manual = testCases.filter(tc => !tc.automatable);

    const chunks: TestCase[][] = [];
    for (let i = 0; i < automatable.length; i += maxParallelWorkers) {
      chunks.push(automatable.slice(i, i + maxParallelWorkers));
    }

    return {
      totalTests: testCases.length,
      parallel: chunks,
      sequential: manual,
      estimatedDurationMs: chunks.length * 15000 + manual.length * 60000
    };
  }
}