import { OrchestratorCore } from '../../services/orchestrator-service/src/core/orchestrator-core';
import { AgentInput } from '../../shared/types/agent.types';
import { generateCorrelationId } from '../../shared/utils/correlation-id';

describe('Orchestrator Pipeline (Integration)', () => {
  let orchestrator: OrchestratorCore;

  beforeAll(async () => {
    orchestrator = new OrchestratorCore();
    await orchestrator.start();
  });

  it('processes a JIRA signal end-to-end', async () => {
    const input: AgentInput = {
      correlationId: generateCorrelationId(),
      source: 'jira',
      payload: { issueKey: 'PROJ-123', priority: 'high' },
      triggeredAt: new Date()
    };

    const output = await orchestrator.processSignal(input);
    expect(output.status).toBe('success');
    expect(output.confidence).toBeGreaterThan(0);
  });
});
