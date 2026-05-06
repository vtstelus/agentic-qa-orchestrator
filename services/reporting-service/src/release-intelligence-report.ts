import { ReleaseIntelligenceReport } from '../../../shared/types/report.types';
import { SlackNotifier } from '../../../integrations/slack/slack-notifier';
import { logger } from '../../../shared/logger';
import { randomUUID } from 'crypto';

export class ReleaseIntelligenceReportService {
  private slackNotifier = new SlackNotifier();

  async generate(version: string, data: Partial<ReleaseIntelligenceReport>): Promise<ReleaseIntelligenceReport> {
    logger.info(`Generating release intelligence report for v${version}`);
    const report: ReleaseIntelligenceReport = {
      reportId: randomUUID(),
      releaseVersion: version,
      generatedAt: new Date(),
      summary: data.summary ?? { totalTests: 0, passed: 0, failed: 0, skipped: 0, passRate: 0, criticalFailures: 0 },
      riskAssessment: data.riskAssessment ?? { overallRisk: 'low', regressionRisk: 0, coverageScore: 0, topRisks: [] },
      testResults: data.testResults ?? { byAgent: {}, failurePatterns: [], flakyTests: [] },
      deploymentRecommendation: this.computeRecommendation(data),
      conditions: data.conditions
    };
    return report;
  }

  private computeRecommendation(data: Partial<ReleaseIntelligenceReport>): 'GO' | 'NO-GO' | 'CONDITIONAL' {
    if ((data.summary?.criticalFailures ?? 0) > 0) return 'NO-GO';
    if ((data.summary?.passRate ?? 0) >= 0.95) return 'GO';
    return 'CONDITIONAL';
  }
}
