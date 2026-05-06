import { AgentOutput } from '../../../../shared/types/agent.types';
import { logger } from '../../../../shared/logger';

export interface ReviewItem {
  id: string;
  output: AgentOutput;
  queuedAt: Date;
  status: 'pending' | 'approved' | 'rejected';
}

export class ReviewQueue {
  private queue: ReviewItem[] = [];

  enqueue(output: AgentOutput): ReviewItem {
    const item: ReviewItem = {
      id: output.correlationId,
      output,
      queuedAt: new Date(),
      status: 'pending'
    };
    this.queue.push(item);
    logger.warn(`Queued for human review: ${item.id}`);
    return item;
  }

  getPending(): ReviewItem[] {
    return this.queue.filter(i => i.status === 'pending');
  }
}
