export const config = {
  llm: {
    model: process.env.LLM_MODEL || 'claude-sonnet-4-20250514',
    maxTokens: 4096,
    temperature: 0.2
  },
  vectorStore: {
    url: process.env.VECTOR_STORE_URL || 'http://localhost:6333',
    collection: process.env.VECTOR_STORE_COLLECTION || 'qa-knowledge'
  },
  trustThresholds: { autoApprove: 0.90, humanReview: 0.70, autoReject: 0.50 }
} as const;
