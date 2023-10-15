import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import ApiError from '../abstractions/ApiError';
import { AUTHORIZATION } from '../constants';
import { TOKEN_FAILED_AUTHENTICATE, TOKEN_NOT_PROVIDED } from '../messages';

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const env = global.environment;
  const authorizationToken = req.headers[AUTHORIZATION];

  if (!authorizationToken) {
    throw new ApiError(TOKEN_NOT_PROVIDED, StatusCodes.UNAUTHORIZED);
  }
  const [Bearer, token] = authorizationToken.split(' ');
  jwt.verify(token, env.secretKey, (err: JsonWebTokenError, decoded: any) => {
    if (err) {
      throw new ApiError(TOKEN_FAILED_AUTHENTICATE, StatusCodes.FORBIDDEN);
    }
    next();
  });
}
