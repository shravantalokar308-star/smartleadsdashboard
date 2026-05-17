import { Router } from 'express';
import authRoutes from './auth';
import leadsRoutes from './leads';
import usersRoutes from './users';

const router = Router();

router.use('/auth', authRoutes);
router.use('/leads', leadsRoutes);
router.use('/users', usersRoutes);

export default router;
