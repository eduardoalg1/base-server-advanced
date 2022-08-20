import express from 'express';

import { ErrorHandle } from './utils';
import account from './services/acronym/routes';

export default async function (app) {
  const router = express.Router().use(account);

  app.use('', router).use(ErrorHandle);
  return app;
}
