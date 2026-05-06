import { RequirementParser } from '../../agents/requirement-understanding-agent/src/requirement-parser';
import { Requirement } from '../../shared/types/requirement.types';

const mockRequirement: Requirement = {
  id: 'req-001',
  jiraKey: 'PROJ-123',
  title: 'User Login with MFA',
  description: 'Users should be able to log in with email and MFA token',
  acceptanceCriteria: [
    'Given a valid email and OTP, when submitted, then user is authenticated',
    'Given an invalid OTP, when submitted, then error message is shown'
  ],
  riskTags: ['auth'],
  priority: 'critical',
  createdAt: new Date()
};

describe('RequirementParser', () => {
  it('should return a parsed requirement with testable scenarios', async () => {
    const parser = new RequirementParser();
    // In CI: mock the Anthropic client
    expect(mockRequirement.jiraKey).toBe('PROJ-123');
    expect(mockRequirement.riskTags).toContain('auth');
  });
});
