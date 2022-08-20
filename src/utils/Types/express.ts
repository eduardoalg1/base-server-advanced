import { Request, Response as Res } from 'express';
import * as core from 'express-serve-static-core';

type ReqProps = {
  Params?: core.ParamsDictionary;
  Queryparams?: core.Query | Record<string, unknown>;
  Body?: unknown;
};

type Req<T extends ReqProps = ReqProps> = Request<
  T['Params'],
  unknown,
  T['Body'],
  T['Queryparams']
>;

export { Req, Res };
