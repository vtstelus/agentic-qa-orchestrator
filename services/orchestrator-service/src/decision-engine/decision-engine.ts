import { AgentInput } from '../../../../shared/types/agent.types';
import { WorkflowPlan } from '../workflow/workflow-engine';

export class DecisionEngine {
  async plan(input: AgentInput): Promise<WorkflowPlan> {
    const isHighRisk = (input.payload as any)?.priority === 'critical';
    return {
      steps: isHighRisk
        ? ['requirement-understanding', 'test-design', 'intelligent-execution', 'failure-investigation', 'quality-intelligence']
        : ['requirement-understanding', 'test-design', 'intelligent-execution'],
      parallelisable: !isHighRisk,
      estimatedDurationMs: isHighRisk ? 120000 : 45000
    };
  }
}
