import { TestCase } from '../../test-design-agent/src/test-case-generator';
import { RiskProfile } from '../../../shared/types/risk.types';

export class RiskBasedSelector {
  select(testCases: TestCase[], riskProfile: RiskProfile): TestCase[] {
    if (riskProfile.overallRisk === 'critical') return testCases;
    if (riskProfile.overallRisk === 'high') return testCases.filter(tc => tc.priority === 'P0' || tc.priority === 'P1');
    return testCases.filter(tc => tc.priority === 'P0');
  }
}
