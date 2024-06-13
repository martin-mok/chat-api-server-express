import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { userService } from '../modules/user/user.service';
import { NotAuthorizedException } from '../exceptions/HttpExceptions';

export async function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    if (!request.headers?.authorization) {
      return response
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: 'No credentials sent!' });
    }
    request.user = { id: request.headers?.authorization.split(' ')[1] };
    console.log('request.user:', request.user);
    const userId = request.user.id;
    // here for safe guard non-exsisting user, might not needed if token verification is implemented
    await userService.findById(userId);
    return next();
  } catch (error) {
    console.error('authMiddleware error:', error);
    return next(new NotAuthorizedException());
  }
}
