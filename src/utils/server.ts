import express from 'express';
import { json, urlencoded } from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import http from 'http';
import { logger } from './logger';
import { TokenValitation } from './middlewares';

const app = express();
const httpServer = http.createServer(app);

app
  .use(helmet())
  .use(cors())
  .use(
    json({
      limit: '20mb'
    })
  )
  .use(
    urlencoded({
      extended: true,
      limit: '20mb'
    })
  )
  .use(TokenValitation)
  .set('trust proxy', true);

const port = process.env.PORT || 3000;
httpServer.listen(port, () => logger.info(`Running on port ${port}`));

export default app;
