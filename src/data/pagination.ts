export type PaginationArgs = {
  offset: number;
  limit: number;
};

export type PaginationResult<T> = {
  items: T[];
  total: number;
  nextOffset: number | null;
};

export function paginateByOffset<T>(rows: T[], args: PaginationArgs): PaginationResult<T> {
  const total = rows.length;
  const offset = Math.max(0, args.offset);
  const limit = Math.max(1, args.limit);
  const items = rows.slice(offset, offset + limit);
  const nextOffset = offset + items.length < total ? offset + items.length : null;
  return { items, total, nextOffset };
}

