import { NextFunction } from 'express';

import { Req, Res, HTTPClientError } from '../../../utils';
import * as ErrorHandler from './ErrorHandler';

export default function (
  err: HTTPClientError,
  req: Req,
  res: Res,
  next: NextFunction
): void {
  return err.statusCode
    ? ErrorHandler.clientError(err, req, res, next)
    : ErrorHandler.serverError(err, req, res, next);
}
