import { Request, Response } from 'express';
import { generateCorrelationId } from '../../../../shared/utils/correlation-id';
import { logger } from '../../../../shared/logger';

export class OrchestratorController {
  async trigger(req: Request, res: Response): Promise<void> {
    const correlationId = generateCorrelationId();
    logger.info(`Trigger received: ${correlationId}`);
    res.json({ correlationId, status: 'queued', message: 'QA workflow triggered' });
  }

  async getStatus(req: Request, res: Response): Promise<void> {
    const { correlationId } = req.params;
    res.json({ correlationId, status: 'processing' });
  }
}
