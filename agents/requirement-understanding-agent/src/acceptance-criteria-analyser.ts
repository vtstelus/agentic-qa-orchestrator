export interface CriteriaAnalysis {
  criterion: string;
  testable: boolean;
  automatable: boolean;
  riskLevel: 'high' | 'medium' | 'low';
  suggestedTestType: 'unit' | 'integration' | 'e2e' | 'manual';
}

export class AcceptanceCriteriaAnalyser {
  analyse(criteria: string[]): CriteriaAnalysis[] {
    return criteria.map(criterion => ({
      criterion,
      testable: !criterion.toLowerCase().includes('should feel'),
      automatable: criterion.toLowerCase().includes('when') || criterion.toLowerCase().includes('given'),
      riskLevel: criterion.toLowerCase().includes('payment') || criterion.toLowerCase().includes('auth') ? 'high' : 'medium',
      suggestedTestType: criterion.toLowerCase().includes('api') ? 'integration' : 'e2e'
    }));
  }
}
