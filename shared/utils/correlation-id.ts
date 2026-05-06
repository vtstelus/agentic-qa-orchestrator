import { randomUUID } from 'crypto';
export const generateCorrelationId = (): string => randomUUID();
