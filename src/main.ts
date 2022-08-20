// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { logger, app } from './utils';

import router from './router';
import MongoDB from './utils/Mongo';

(async function () {
  try {
    if (process.env.APP_ENV !== 'test')
      await MongoDB.connect(process.pid.toString());
    const startTime = +new Date();
    router(app);
    const endTime = +new Date();
    logger.info(`App started in ${((endTime - startTime) / 1000).toFixed(2)}s`);
  } catch (error) {
    logger.warn(`Error loading module routes:  ${error}`);
  }
})();
