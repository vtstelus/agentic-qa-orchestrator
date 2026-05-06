export type FailureCategory = 'environment' | 'flaky' | 'regression' | 'product-bug' | 'test-issue';

export interface ClassifiedFailure {
  testCaseId: string;
  category: FailureCategory;
  confidence: number;
  indicators: string[];
}

export class FailureClassifier {
  classify(testCaseId: string, errorMessage: string, logs: string): ClassifiedFailure {
    const isEnv = logs.includes('Connection refused') || logs.includes('timeout');
    const isFlaky = logs.includes('ElementNotInteractable') || logs.includes('StaleElement');

    return {
      testCaseId,
      category: isEnv ? 'environment' : isFlaky ? 'flaky' : 'regression',
      confidence: 0.82,
      indicators: [errorMessage.slice(0, 100)]
    };
  }
}
