export const mockAnthropicResponse = (text: string) => ({
  content: [{ type: 'text', text }],
  model: 'claude-sonnet-4-20250514',
  stop_reason: 'end_turn',
  usage: { input_tokens: 100, output_tokens: 200 }
});

export const mockParsedRequirementResponse = JSON.stringify({
  testableScenarios: ['User can complete checkout with valid card', 'User sees error with invalid card'],
  edgeCases: ['Network timeout during payment', 'Duplicate submission'],
  automationCandidates: ['Happy path checkout', 'Card validation errors']
});
