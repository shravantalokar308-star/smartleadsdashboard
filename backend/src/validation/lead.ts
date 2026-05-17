import { z } from 'zod';

export const leadCreateSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  status: z.optional(z.enum(['New', 'Contacted', 'Qualified', 'Lost'])),
  source: z.optional(z.enum(['Website', 'Instagram', 'Referral'])),
  assignedTo: z.optional(z.string())
});
