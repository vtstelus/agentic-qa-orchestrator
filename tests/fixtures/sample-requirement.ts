import { Requirement } from '../../shared/types/requirement.types';

export const sampleRequirement: Requirement = {
  id: 'fixture-001',
  jiraKey: 'DEMO-42',
  title: 'Checkout Payment Flow',
  description: 'As a customer, I want to complete payment so that my order is confirmed',
  acceptanceCriteria: [
    'Given a valid card, when payment is submitted, then order is confirmed within 3 seconds',
    'Given an expired card, when payment is submitted, then error message is displayed',
    'Given a network timeout, when payment fails, then retry mechanism activates'
  ],
  riskTags: ['payment', 'performance'],
  priority: 'critical',
  createdAt: new Date('2026-01-15')
};
