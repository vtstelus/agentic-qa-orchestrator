import { AgentOutput } from '../../../../shared/types/agent.types';

export interface PolicyViolation {
  rule: string;
  severity: 'error' | 'warning';
  detail: string;
}

export class PolicyValidator {
  validate(output: AgentOutput): PolicyViolation[] {
    const violations: PolicyViolation[] = [];
    if (output.confidence < 0.5) {
      violations.push({ rule: 'MIN_CONFIDENCE', severity: 'error', detail: 'Confidence below minimum threshold' });
    }
    if (!output.result || Object.keys(output.result).length === 0) {
      violations.push({ rule: 'NON_EMPTY_RESULT', severity: 'error', detail: 'Agent returned empty result' });
    }
    return violations;
  }
}
