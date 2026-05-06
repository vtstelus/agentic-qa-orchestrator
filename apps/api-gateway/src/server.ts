import express from 'express';
import { logger } from '../../../shared/logger';

const app = express();
app.use(express.json());

app.get('/health', (_, res) => res.json({ status: 'ok', service: 'api-gateway' }));

app.listen(process.env.PORT || 3000, () => {
  logger.info(`API Gateway running on port ${process.env.PORT || 3000}`);
});

export default app;
