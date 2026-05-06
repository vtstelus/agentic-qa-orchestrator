import { AgentInput, AgentOutput } from '../../../../shared/types/agent.types';
import { WorkflowEngine } from '../workflow/workflow-engine';
import { DecisionEngine } from '../decision-engine/decision-engine';
import { logger } from '../../../../shared/logger';

export class OrchestratorCore {
  private workflowEngine: WorkflowEngine;
  private decisionEngine: DecisionEngine;

  constructor() {
    this.workflowEngine = new WorkflowEngine();
    this.decisionEngine = new DecisionEngine();
  }

  async start(): Promise<void> {
    logger.info('AI Orchestrator Core initialised');
    await this.workflowEngine.init();
  }

  async processSignal(input: AgentInput): Promise<AgentOutput> {
    logger.info(`Processing signal: ${input.correlationId} from ${input.source}`);
    const plan = await this.decisionEngine.plan(input);
    return this.workflowEngine.execute(plan);
  }
}
