export interface Requirement {
  id: string;
  jiraKey: string;
  title: string;
  description: string;
  acceptanceCriteria: string[];
  riskTags: RiskTag[];
  priority: 'critical' | 'high' | 'medium' | 'low';
  createdAt: Date;
}
export type RiskTag = 'payment' | 'auth' | 'data-loss' | 'performance' | 'security' | 'regression';
export interface ParsedRequirement extends Requirement {
  testableScenarios: string[];
  edgeCases: string[];
  automationCandidates: string[];
}
