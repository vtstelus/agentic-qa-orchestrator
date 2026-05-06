export interface TraceabilityRecord {
  traceId: string;
  correlationId: string;
  createdAt: Date;
  story: StoryTrace;
  tests: TestTrace[];
  execution: ExecutionTrace;
  defects: DefectTrace[];
  release: ReleaseTrace;
}

export interface StoryTrace {
  jiraKey: string;
  title: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  acceptanceCriteriaCount: number;
  riskTags: string[];
}

export interface TestTrace {
  testCaseId: string;
  title: string;
  type: 'happy-path' | 'negative' | 'edge-case' | 'regression' | 'performance';
  priority: 'P0' | 'P1' | 'P2' | 'P3';
  automatable: boolean;
  generatedBy: 'test-design-agent';
}

export interface ExecutionTrace {
  executionId: string;
  totalTests: number;
  passed: number;
  failed: number;
  skipped: number;
  durationMs: number;
  executedAt: Date;
  executedBy: 'intelligent-execution-agent';
}

export interface DefectTrace {
  defectId: string;
  testCaseId: string;
  failureCategory: 'environment' | 'flaky' | 'regression' | 'product-bug' | 'test-issue';
  rootCause: string;
  severity: 'critical' | 'major' | 'minor';
  jiraTicketCreated: boolean;
  investigatedBy: 'failure-investigation-agent';
}

export interface ReleaseTrace {
  releaseVersion: string;
  recommendation: 'GO' | 'NO-GO' | 'CONDITIONAL';
  riskScore: number;
  approvedBy: 'deployment-gate' | 'human-reviewer';
  releasedAt?: Date;
}

// Full traceability chain: Story → Test → Execution → Defect → Release
export type TraceabilityChain = Pick<TraceabilityRecord, 'story' | 'tests' | 'execution' | 'defects' | 'release'>;