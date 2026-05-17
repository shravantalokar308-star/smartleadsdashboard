import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import * as leadService from '../services/leadService';

export const createLead = asyncHandler(async (req: Request, res: Response) => {
  const lead = await leadService.createLead(req.body, req.user);
  res.status(201).json(lead);
});

export const getLeads = asyncHandler(async (req: Request, res: Response) => {
  const result = await leadService.getLeads(req.query as any, req.user);
  res.json(result);
});

export const getLead = asyncHandler(async (req: Request, res: Response) => {
  const lead = await leadService.getLeadById(req.params.id);
  if (!lead) { res.status(404).json({ message: 'Not found' }); return; }
  res.json(lead);
});

export const updateLead = asyncHandler(async (req: Request, res: Response) => {
  const updated = await leadService.updateLead(req.params.id, req.body, req.user);
  res.json(updated);
});

export const deleteLead = asyncHandler(async (req: Request, res: Response) => {
  await leadService.deleteLead(req.params.id);
  res.status(204).end();
});
