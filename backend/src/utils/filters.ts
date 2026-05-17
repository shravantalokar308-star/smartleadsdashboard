import { FilterQuery } from 'mongoose';

export const buildQuery = (query: any) => {
  const filter: FilterQuery<any> = {};
  if (query.status) filter.status = query.status;
  if (query.source) filter.source = query.source;
  if (query.search) filter.$or = [
    { name: { $regex: query.search, $options: 'i' } },
    { email: { $regex: query.search, $options: 'i' } }
  ];
  const sort = query.sort === 'oldest' ? { createdAt: 1 } : { createdAt: -1 };
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  return { filter, sort, page, limit };
};
