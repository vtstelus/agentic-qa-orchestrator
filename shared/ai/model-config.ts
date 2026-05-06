export interface ModelConfig {
  model: string;
  maxTokens: number;
  temperature: number;
  topP?: number;
}

export const MODEL_CONFIGS: Record<string, ModelConfig> = {
  default: {
    model: 'claude-sonnet-4-20250514',
    maxTokens: 4096,
    temperature: 0.2
  },
  creative: {
    model: 'claude-sonnet-4-20250514',
    maxTokens: 4096,
    temperature: 0.7
  },
  precise: {
    model: 'claude-sonnet-4-20250514',
    maxTokens: 2048,
    temperature: 0.0
  }
};

export const getModelConfig = (profile: keyof typeof MODEL_CONFIGS = 'default'): ModelConfig => {
  return MODEL_CONFIGS[profile];
};