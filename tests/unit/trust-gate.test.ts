import { TrustGate } from '../../services/trust-layer-service/src/deployment-gate';
import { AgentOutput } from '../../shared/types/agent.types';

const makeOutput = (confidence: number): AgentOutput => ({
  correlationId: 'test-id',
  agentId: 'test-agent',
  status: 'success',
  result: { data: 'ok' },
  confidence,
  executionMs: 1000,
  completedAt: new Date()
});

describe('TrustGate', () => {
  const gate = new TrustGate();

  it('auto-approves high confidence outputs', () => {
    expect(gate.evaluate(makeOutput(0.95)).decision).toBe('AUTO_APPROVE');
  });

  it('queues for human review at moderate confidence', () => {
    expect(gate.evaluate(makeOutput(0.80)).decision).toBe('HUMAN_REVIEW');
  });

  it('auto-rejects low confidence outputs', () => {
    expect(gate.evaluate(makeOutput(0.40)).decision).toBe('AUTO_REJECT');
  });
});
