const DEFAULT_FROM = 0;
const DEFAULT_LIMIT = 50;

export default function (query: { from?: string; limit?: string }): {
  from: number;
  limit: number;
} {
  return parsePagination(query);
}

export function parsePagination(query: { from?: string; limit?: string }): {
  from: number;
  limit: number;
} {
  try {
    return {
      from: parseInt(query.from || String(DEFAULT_FROM)),
      limit: parseInt(query.limit || String(DEFAULT_LIMIT))
    };
  } catch (error) {
    return {
      from: DEFAULT_FROM,
      limit: DEFAULT_LIMIT
    };
  }
}
