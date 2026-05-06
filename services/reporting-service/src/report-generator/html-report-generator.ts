import { ReleaseIntelligenceReport } from '../../../../shared/types/report.types';

export class HtmlReportGenerator {
  generate(report: ReleaseIntelligenceReport): string {
    const color = report.deploymentRecommendation === 'GO' ? '#22c55e' : report.deploymentRecommendation === 'NO-GO' ? '#ef4444' : '#f59e0b';
    return `<!DOCTYPE html>
<html>
<head><title>Release Intelligence Report — ${report.releaseVersion}</title></head>
<body style="font-family:sans-serif;max-width:800px;margin:40px auto;">
  <h1 style="color:${color}">Release ${report.releaseVersion} — ${report.deploymentRecommendation}</h1>
  <p>Generated: ${report.generatedAt.toISOString()}</p>
  <h2>Test Summary</h2>
  <table border="1" cellpadding="8">
    <tr><th>Total</th><th>Passed</th><th>Failed</th><th>Skipped</th><th>Pass Rate</th></tr>
    <tr>
      <td>${report.summary.totalTests}</td>
      <td>${report.summary.passed}</td>
      <td>${report.summary.failed}</td>
      <td>${report.summary.skipped}</td>
      <td>${(report.summary.passRate * 100).toFixed(1)}%</td>
    </tr>
  </table>
  <h2>Risk Assessment</h2>
  <p><strong>Overall Risk:</strong> ${report.riskAssessment.overallRisk}</p>
  <p><strong>Top Risks:</strong> ${report.riskAssessment.topRisks.join(', ') || 'None identified'}</p>
</body>
</html>`;
  }
}
