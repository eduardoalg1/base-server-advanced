import * as service from './service';
import { Req, Res, validateAndSanitize } from '../../utils';

type IFilter = {
  from: string;
  limit: string;
  search: string;
};

type IBody = {
  acronym?: string;
  definition?: string;
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

  return service.list({ from, limit, search }).then(({ data, moreResults }) => {
    res.setHeader('More-Results', moreResults ? 'yes' : 'no');
    res.json(data);
  });
}

export async function addAcronym(req: Req, res: Res) {
  const body = req.body as IBody;
  const { acronym, definition } =
    validateAndSanitize<IBody>({
      object: body,
      fields: {
        acronym: 'string',
        definition: 'string'
      }
    }) || {};

  return service
    .addAcronym({ acronym, definition })
    .then((data) => res.json(data));
}

export async function updateAcronym(req: Req, res: Res) {
  const { body, params } = req as { params: IBody; body: IBody };
  const { definition } =
    validateAndSanitize({
      object: body,
      fields: {
        definition: 'string'
      }
    }) || {};

  const { acronym } =
    validateAndSanitize({
      object: params,
      fields: {
        acronym: 'string'
      }
    }) || {};

  return service
    .updateAcronym({ acronym, definition })
    .then((data) => res.json(data));
}

export async function deleteAcronym(req: Req, res: Res) {
  const { params } = req;

  const { acronym } =
    validateAndSanitize({
      object: params,
      fields: {
        acronym: 'string'
      }
    }) || {};

  return service.deleteAcronym({ acronym }).then((data) => res.json(data));
}
