import { Acronym, IAcronym } from '../../models';
import { Doc, parsePagination } from '../../utils';

export async function list({
  search,
  ...pagination
}: {
  from: string;
  limit: string;
  search: string;
}): Promise<{
  data: Doc<IAcronym>[];
  moreResults: boolean;
}> {
  const { from, limit } = parsePagination(pagination);
  const regExp = new RegExp(search, 'gi');
  const query = { $or: [{ acronym: regExp }, { definition: regExp }] };
  const data = await Acronym.find(query).skip(from).limit(limit).lean();
  const allDocs = await Acronym.countDocuments(query);
  return {
    data,
    moreResults: allDocs > from + limit
  };
}

export async function addAcronym({
  acronym,
  definition
}: {
  acronym: string;
  definition: string;
}): Promise<Doc<IAcronym>> {
  return Acronym.create({ acronym, definition });
}

export async function updateAcronym({
  acronym,
  definition
}: {
  acronym: string;
  definition: string;
}): Promise<Doc<IAcronym>> {
  return Acronym.findOneAndUpdate(
    { acronym },
    { definition },
    { new: true }
  ).lean();
}

export async function deleteAcronym({
  acronym
}: {
  acronym: string;
}): Promise<Doc<IAcronym>[]> {
  return Acronym.findOneAndDelete({ acronym }).lean();
}
