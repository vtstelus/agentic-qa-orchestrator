import { Request, Response, NextFunction } from 'express';

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== process.env.API_GATEWAY_KEY) {
    res.status(401).json({ error: 'Unauthorised' });
    return;
  }
  next();
}
