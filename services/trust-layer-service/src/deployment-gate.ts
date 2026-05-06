import { AgentResponse } from '../../../shared/types/agent.types';
import { config } from '../../../shared/config';
import { logger } from '../../../shared/logger';

export type GateDecision = 'AUTO_APPROVE' | 'HUMAN_REVIEW' | 'AUTO_REJECT';

export interface GateResult {
  decision: GateDecision;
  confidence: number;
  rationale: string;
  recommendation: 'GO' | 'NO-GO' | 'CONDITIONAL';
  reviewerNote?: string;
}

export class DeploymentGate {
  evaluate(output: AgentResponse): GateResult {
    const { confidence } = output;
    const { autoApprove, humanReview } = config.trustThresholds;

    if (confidence >= autoApprove) {
      logger.info(`DeploymentGate: AUTO_APPROVE (confidence=${confidence})`);
      return {
        decision: 'AUTO_APPROVE',
        confidence,
        rationale: 'High confidence — auto-approved for release',
        recommendation: 'GO'
      };
    }

    if (confidence >= humanReview) {
      logger.warn(`DeploymentGate: HUMAN_REVIEW (confidence=${confidence})`);
      return {
        decision: 'HUMAN_REVIEW',
        confidence,
        rationale: 'Moderate confidence — requires human review before release',
        recommendation: 'CONDITIONAL'
      };
    }

    logger.error(`DeploymentGate: AUTO_REJECT (confidence=${confidence})`);
    return {
      decision: 'AUTO_REJECT',
      confidence,
      rationale: 'Low confidence — rejected, re-processing required',
      recommendation: 'NO-GO'
    };
  }
}