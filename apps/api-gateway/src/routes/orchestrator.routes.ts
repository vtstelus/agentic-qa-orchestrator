import { Router } from 'express';
import { OrchestratorController } from '../controllers/orchestrator.controller';

const router = Router();
const controller = new OrchestratorController();

router.post('/trigger', controller.trigger.bind(controller));
router.get('/status/:correlationId', controller.getStatus.bind(controller));

export default router;
