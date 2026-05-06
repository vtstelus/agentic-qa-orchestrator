import Anthropic from '@anthropic-ai/sdk';
import { ModelConfig, getModelConfig } from './model-config';
import { logger } from '../logger';
import { withRetry } from '../utils/retry';

export interface LLMRequest {
  system: string;
  userMessage: string;
  modelProfile?: 'default' | 'creative' | 'precise';
  overrides?: Partial<ModelConfig>;
}

export interface LLMResponse {
  text: string;
  inputTokens: number;
  outputTokens: number;
  model: string;
  durationMs: number;
}

export class LLMClient {
  private client: Anthropic;

  constructor() {
    this.client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY
    });
  }

  async complete(request: LLMRequest): Promise<LLMResponse> {
    const config = {
      ...getModelConfig(request.modelProfile || 'default'),
      ...request.overrides
    };

    const start = Date.now();
    logger.info(`LLMClient: calling model ${config.model}`);

    const response = await withRetry(() =>
      this.client.messages.create({
        model: config.model,
        max_tokens: config.maxTokens,
        temperature: config.temperature,
        system: request.system,
        messages: [{ role: 'user', content: request.userMessage }]
      })
    );

    const content = response.content[0];
    if (content.type !== 'text') throw new Error('Unexpected LLM response type');

    return {
      text: content.text,
      inputTokens: response.usage.input_tokens,
      outputTokens: response.usage.output_tokens,
      model: response.model,
      durationMs: Date.now() - start
    };
  }

  async completeJSON<T>(request: LLMRequest): Promise<T> {
    const response = await this.complete(request);
    try {
      return JSON.parse(response.text) as T;
    } catch {
      logger.error('LLMClient: failed to parse JSON response', { text: response.text });
      throw new Error('LLM returned invalid JSON');
    }
  }
}

// Singleton instance for use across agents
export const llmClient = new LLMClient();