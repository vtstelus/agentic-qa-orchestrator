import { ReleaseIntelligenceReport, TestResultsSummary } from '../../../shared/types/report.types';

export class QualityInsights {
  computePassRate(summary: TestResultsSummary): number {
    const total = Object.values(summary.byAgent).reduce((a, b) => a + b, 0);
    return total > 0 ? (summary.byAgent['passed'] || 0) / total : 0;
  }

  identifyTrends(reports: ReleaseIntelligenceReport[]): string[] {
    const trends: string[] = [];
    if (reports.length < 2) return trends;
    const latest = reports[reports.length - 1];
    const previous = reports[reports.length - 2];
    if (latest.summary.passRate < previous.summary.passRate) trends.push('Pass rate declining');
    if (latest.summary.criticalFailures > 0) trends.push('Critical failures detected');
    return trends;
  }
}
