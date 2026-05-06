import { RiskTagGenerator } from '../../agents/requirement-understanding-agent/src/risk-tag-generator';

describe('RiskTagGenerator', () => {
  const generator = new RiskTagGenerator();

  it('detects payment risk from text', () => {
    const tags = generator.generate('User completes checkout with stripe payment');
    expect(tags).toContain('payment');
  });

  it('detects auth risk from text', () => {
    const tags = generator.generate('User logs in with OAuth token');
    expect(tags).toContain('auth');
  });

  it('detects multiple risk tags', () => {
    const tags = generator.generate('Migrate billing data and update payment gateway');
    expect(tags.length).toBeGreaterThan(1);
  });

  it('returns empty array for low-risk text', () => {
    const tags = generator.generate('Update the UI button colour');
    expect(tags.length).toBe(0);
  });
});
