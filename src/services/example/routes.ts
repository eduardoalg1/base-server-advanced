import express from 'express';
import * as controller from './controller';
import { catchErrors } from '../../utils';

const routes = express.Router().get('/', catchErrors(controller.list));

export default express.Router().use('/example', routes);
