import { AgentOutput } from '../../../../shared/types/agent.types';

export class ConfidenceScorer {
  score(output: AgentOutput): number {
    const factors = [
      output.status === 'success' ? 0.4 : 0,
      output.confidence * 0.4,
      output.executionMs < 30000 ? 0.2 : 0.1
    ];
    return factors.reduce((a, b) => a + b, 0);
  }
}
