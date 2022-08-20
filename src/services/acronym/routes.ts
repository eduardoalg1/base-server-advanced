import express from 'express';
import * as controller from './controller';
import { catchErrors } from '../../utils';

const routes = express
  .Router()
  .get('/', catchErrors(controller.list))
  .post('/', catchErrors(controller.addAcronym))
  .put('/:acronym', catchErrors(controller.updateAcronym))
  .delete('/:acronym', catchErrors(controller.deleteAcronym));

export default express.Router().use('/acronym', routes);
