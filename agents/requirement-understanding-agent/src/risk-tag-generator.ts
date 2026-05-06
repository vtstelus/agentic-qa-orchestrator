import { RiskTag } from '../../../shared/types/requirement.types';

const RISK_KEYWORDS: Record<RiskTag, string[]> = {
  payment: ['payment', 'billing', 'checkout', 'card', 'stripe'],
  auth: ['login', 'logout', 'token', 'oauth', 'permission', 'role'],
  'data-loss': ['delete', 'purge', 'migrate', 'truncate', 'drop'],
  performance: ['load', 'concurrent', 'throughput', 'latency', 'response time'],
  security: ['encrypt', 'decrypt', 'xss', 'sql injection', 'csrf', 'sanitise'],
  regression: ['refactor', 'upgrade', 'replace', 'migrate']
};

export class RiskTagGenerator {
  generate(text: string): RiskTag[] {
    const lower = text.toLowerCase();
    return (Object.entries(RISK_KEYWORDS) as [RiskTag, string[]][])
      .filter(([, keywords]) => keywords.some(kw => lower.includes(kw)))
      .map(([tag]) => tag);
  }
}
