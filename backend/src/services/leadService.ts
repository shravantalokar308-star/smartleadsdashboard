import Lead from '../models/Lead';
import { Types } from 'mongoose';
import { buildQuery } from '../utils/filters';
import { paginate } from '../utils/paginate';

export const createLead = async (data: any, user?: any) => {
  // If a sales user creates the lead, auto-assign it to them
  if (user && user.role === 'sales') {
    try {
      data.assignedTo = user.id;
    } catch (e) {
      // ignore
    }
  }
  return Lead.create(data);
};

export const getLeads = async (query: any, user: any) => {
  const { filter, sort, page, limit } = buildQuery(query);
  
  // Sales users only get leads assigned to them
  if (user && user.role === 'sales') {
    filter.assignedTo = new Types.ObjectId(user.id);
  }

  const q = Lead.find(filter).sort(sort);
  return paginate(q, { page, limit });
};

export const getLeadById = async (id: string) => Lead.findById(id);

export const updateLead = async (id: string, data: any, user: any) => {
  const lead = await Lead.findById(id);
  if (!lead) throw new Error('Lead not found');
  if (user.role === 'sales' && String(lead.assignedTo) !== user.id) {
    throw new Error('Forbidden: not assigned to you');
  }
  Object.assign(lead, data);
  return lead.save();
};

export const deleteLead = async (id: string) => Lead.findByIdAndDelete(id);

