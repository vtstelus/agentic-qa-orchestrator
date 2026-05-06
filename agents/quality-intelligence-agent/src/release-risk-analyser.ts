import { RiskProfile, RiskLevel } from '../../../shared/types/risk.types';

export class ReleaseRiskAnalyser {
  analyse(profiles: RiskProfile[]): { overallRisk: RiskLevel; score: number; summary: string } {
    const avg = profiles.reduce((sum, p) => sum + p.regressionRisk, 0) / profiles.length;
    const criticalCount = profiles.filter(p => p.overallRisk === 'critical').length;

    const overallRisk: RiskLevel = criticalCount > 0 ? 'critical' : avg > 0.7 ? 'high' : avg > 0.4 ? 'medium' : 'low';
    return { overallRisk, score: avg, summary: `${profiles.length} requirements analysed, ${criticalCount} critical` };
  }
}
