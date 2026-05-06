import { TestCase } from './test-case-generator';

export class AutomationCandidateSelector {
  select(testCases: TestCase[]): TestCase[] {
    return testCases.filter(tc =>
      tc.automatable &&
      (tc.priority === 'P0' || tc.priority === 'P1') &&
      tc.type !== 'performance'
    );
  }

  rank(candidates: TestCase[]): TestCase[] {
    const priorityScore: Record<string, number> = { P0: 4, P1: 3, P2: 2, P3: 1 };
    return candidates.sort((a, b) => priorityScore[b.priority] - priorityScore[a.priority]);
  }
}
