import { SYSTEM_PROMPTS } from '../prompts/system-prompts';

export type PromptKey = keyof typeof SYSTEM_PROMPTS;

export interface PromptTemplate {
  key: PromptKey;
  system: string;
  version: string;
  description: string;
}

export const PROMPT_REGISTRY: Record<PromptKey, PromptTemplate> = {
  requirementUnderstanding: {
    key: 'requirementUnderstanding',
    system: SYSTEM_PROMPTS.requirementUnderstanding,
    version: '1.0.0',
    description: 'Parses JIRA requirements into testable scenarios, edge cases and risk tags'
  },
  testDesign: {
    key: 'testDesign',
    system: SYSTEM_PROMPTS.testDesign,
    version: '1.0.0',
    description: 'Generates comprehensive test cases from parsed requirements'
  },
  failureInvestigation: {
    key: 'failureInvestigation',
    system: SYSTEM_PROMPTS.failureInvestigation,
    version: '1.0.0',
    description: 'Classifies failures and recommends root cause remediation'
  },
  qualityIntelligence: {
    key: 'qualityIntelligence',
    system: SYSTEM_PROMPTS.qualityIntelligence,
    version: '1.0.0',
    description: 'Synthesises test results into a Release Intelligence Report with GO/NO-GO recommendation'
  }
};

export class PromptManager {
  get(key: PromptKey): PromptTemplate {
    const template = PROMPT_REGISTRY[key];
    if (!template) throw new Error(`Prompt not found: ${key}`);
    return template;
  }

  getSystem(key: PromptKey): string {
    return this.get(key).system;
  }

  list(): PromptTemplate[] {
    return Object.values(PROMPT_REGISTRY);
  }
}

export const promptManager = new PromptManager();