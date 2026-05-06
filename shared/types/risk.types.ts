export interface RiskProfile {
  requirementId: string;
  overallRisk: RiskLevel;
  regressionRisk: number;
  coverageGap: number;
  changeImpact: number;
  factors: RiskFactor[];
}
export type RiskLevel = 'critical' | 'high' | 'medium' | 'low';
export interface RiskFactor {
  name: string;
  score: number;
  rationale: string;
}
