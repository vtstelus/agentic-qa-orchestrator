import { OrchestratorCore } from './core/orchestrator-core';
import { logger } from '../../../shared/logger';

async function bootstrap() {
  logger.info('🚀 AI Orchestrator Service starting...');
  const orchestrator = new OrchestratorCore();
  await orchestrator.start();
}

bootstrap().catch(err => { logger.error('Fatal error', err); process.exit(1); });
