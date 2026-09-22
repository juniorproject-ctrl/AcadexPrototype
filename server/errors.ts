import type { NextFunction, Request, Response } from 'express';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export function asyncHandler(handler: (req: Request, res: Response, next: NextFunction) => Promise<unknown>) {
  return (req: Request, res: Response, next: NextFunction) => {
    void handler(req, res, next).catch(next);
  };
}

export function notFound(_req: Request, res: Response) {
  res.status(404).json({ error: 'Route not found.' });
}

export function errorHandler(error: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (error instanceof ApiError) return res.status(error.status).json({ error: error.message });
  console.error(error);
  return res.status(500).json({ error: 'An unexpected server error occurred.' });
}
