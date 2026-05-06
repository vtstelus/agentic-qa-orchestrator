import axios from 'axios';
import { ReleaseIntelligenceReport } from '../../shared/types/report.types';

export class SlackNotifier {
  private token = process.env.SLACK_BOT_TOKEN!;

  async notifyReleaseReport(channel: string, report: ReleaseIntelligenceReport): Promise<void> {
    const emoji = report.deploymentRecommendation === 'GO' ? '✅' : report.deploymentRecommendation === 'NO-GO' ? '🚫' : '⚠️';
    await axios.post('https://slack.com/api/chat.postMessage', {
      channel,
      blocks: [
        { type: 'header', text: { type: 'plain_text', text: `${emoji} Release ${report.releaseVersion} — ${report.deploymentRecommendation}` } },
        { type: 'section', text: { type: 'mrkdwn', text: `*Pass Rate:* ${(report.summary.passRate * 100).toFixed(1)}%\n*Risk:* ${report.riskAssessment.overallRisk}\n*Tests:* ${report.summary.totalTests} total` } }
      ]
    }, { headers: { Authorization: `Bearer ${this.token}` } });
  }
}
