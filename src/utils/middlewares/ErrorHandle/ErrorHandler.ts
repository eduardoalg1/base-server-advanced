import { logger } from '../../logger';
import { NextFunction } from 'express';

import { Req, Res, HTTPClientError } from '../../../utils';

export function clientError(
  err: HTTPClientError,
  _: Req,
  res: Res,
  next: NextFunction
) {
  res.status(err.statusCode as number).json({ message: err.message || err });
  return next();
}

export function serverError(
  err: HTTPClientError,
  req: Req,
  res: Res,
  next: NextFunction
) {
  const logMessage = err.stack ? `\n ${err.stack}` : ` - ${err}`;
  logger.error(`${new Date()} - ${req.method} - ${req.url} ${logMessage}`);
  const message =
    process.env.APP_ENV === 'prod' ? 'Internal Server Error' : err.message;
  res.status(500).json({ message });
  return next();
}
