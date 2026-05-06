export interface LogAnalysis {
  errorType: string;
  stackTrace: string[];
  affectedComponent: string;
  timestamp: Date;
  severity: 'critical' | 'major' | 'minor';
}

export class LogAnalyser {
  analyse(rawLog: string): LogAnalysis {
    const lines = rawLog.split('\n');
    const errorLine = lines.find(l => l.includes('Error:') || l.includes('Exception')) || '';
    const stackLines = lines.filter(l => l.trim().startsWith('at ')).slice(0, 5);

    return {
      errorType: errorLine.split(':')[0]?.trim() || 'UnknownError',
      stackTrace: stackLines,
      affectedComponent: stackLines[0]?.match(/\(([^)]+)\)/)?.[1] || 'unknown',
      timestamp: new Date(),
      severity: errorLine.includes('Critical') ? 'critical' : 'major'
    };
  }
}
