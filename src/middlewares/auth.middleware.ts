import { Request, Response, NextFunction } from 'express';

export function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  if (!request.headers?.authorization) {
    return response.status(403).json({ error: 'No credentials sent!' });
  }
  request.user = { id: request.headers?.authorization.split(' ')[1] };
  console.log('request.user:', request.user);
  return next();
}
