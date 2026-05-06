export interface ReleaseIntelligenceReport {
  reportId: string;
  releaseVersion: string;
  generatedAt: Date;
  summary: ReportSummary;
  riskAssessment: RiskAssessment;
  testResults: TestResultsSummary;
  deploymentRecommendation: 'GO' | 'NO-GO' | 'CONDITIONAL';
  conditions?: string[];
}
export interface ReportSummary {
  totalTests: number;
  passed: number;
  failed: number;
  skipped: number;
  passRate: number;
  criticalFailures: number;
}
export interface RiskAssessment {
  overallRisk: string;
  regressionRisk: number;
  coverageScore: number;
  topRisks: string[];
}
export interface TestResultsSummary {
  byAgent: Record<string, number>;
  failurePatterns: string[];
  flakyTests: string[];
}
