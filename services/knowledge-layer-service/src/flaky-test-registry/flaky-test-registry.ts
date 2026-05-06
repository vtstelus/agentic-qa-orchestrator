export interface FlakyTestRecord {
  testId: string;
  title: string;
  flakyCount: number;
  lastFlakyAt: Date;
  rootCauses: string[];
  status: 'monitoring' | 'quarantined' | 'resolved';
}

export class FlakyTestRegistry {
  private registry: Map<string, FlakyTestRecord> = new Map();

  record(testId: string, title: string, rootCause: string): void {
    const existing = this.registry.get(testId);
    if (existing) {
      existing.flakyCount++;
      existing.lastFlakyAt = new Date();
      existing.rootCauses.push(rootCause);
      if (existing.flakyCount >= 3) existing.status = 'quarantined';
    } else {
      this.registry.set(testId, { testId, title, flakyCount: 1, lastFlakyAt: new Date(), rootCauses: [rootCause], status: 'monitoring' });
    }
  }

  getQuarantined(): FlakyTestRecord[] {
    return [...this.registry.values()].filter(r => r.status === 'quarantined');
  }
}
