import express from 'express';

import { ErrorHandle } from './utils';
import example from './services/example/routes';

export default async function (app) {
  const router = express.Router().use(example);

  app.use('', router).use(ErrorHandle);
  return app;
}
