import { Example, IExample } from '../../models';
import { Doc, parsePagination } from '../../utils';

export async function list({
  search,
  ...pagination
}: {
  from: string;
  limit: string;
  search: string;
}): Promise<Doc<IExample>[]> {
  const { from, limit } = parsePagination(pagination);
  const regExp = new RegExp(search, 'gi');
  const query = { $or: [{ Example: regExp }, { definition: regExp }] };
  const data = await Example.find(query).skip(from).limit(limit).lean();
  return data;
}
