import { Router } from 'express';
import * as leadController from '../controllers/leadController';
import { protect, authorize } from '../middleware/auth';

const router = Router();

router.use(protect);
router.post('/', authorize(['admin']), leadController.createLead);
router.get('/', leadController.getLeads);
router.get('/:id', leadController.getLead);
router.put('/:id', leadController.updateLead);
router.delete('/:id', authorize(['admin']), leadController.deleteLead);

export default router;
