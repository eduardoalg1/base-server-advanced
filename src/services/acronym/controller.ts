import * as service from './service';
import { Req, Res, validateAndSanitize } from '../../utils';

type IFilter = {
  from: string;
  limit: string;
  search: string;
};

export async function list(req: Req, res: Res) {
  const filter = req.query as IFilter;
  const { from, limit, search } =
    validateAndSanitize<IFilter>({
      object: filter,
      fields: {
        search: 'string'
      },
      onlySanitize: true
    }) || {};

  return service.list({ from, limit, search }).then((data) => res.json(data));
}
