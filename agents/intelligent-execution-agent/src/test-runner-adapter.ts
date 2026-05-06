import { TestCase } from '../../test-design-agent/src/test-case-generator';

export interface TestRunResult {
  testCaseId: string;
  status: 'passed' | 'failed' | 'skipped' | 'flaky';
  durationMs: number;
  errorMessage?: string;
  screenshot?: string;
}

export class TestRunnerAdapter {
  async run(testCase: TestCase): Promise<TestRunResult> {
    // Adapter for Playwright / Selenium / Jest
    const start = Date.now();
    return {
      testCaseId: testCase.id,
      status: 'passed',       // In production: actual runner result
      durationMs: Date.now() - start
    };
  }
}
