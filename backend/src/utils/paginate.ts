import { Document, Query } from 'mongoose';

export const paginate = async (query: Query<any, Document>, opts: { page?: number; limit?: number }) => {
  const page = Number(opts.page) || 1;
  const limit = Number(opts.limit) || 10;
  const skip = (page - 1) * limit;
  const [data, total] = await Promise.all([
    query.skip(skip).limit(limit).exec(),
    // @ts-ignore
    (query.model.countDocuments(query.getQuery()))
  ]);
  const totalRecords = await total;
  const totalPages = Math.ceil(totalRecords / limit) || 1;
  return { data, meta: { currentPage: page, totalPages, totalRecords } };
};
