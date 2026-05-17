import { Router } from 'express';
import { protect, authorize } from '../middleware/auth';
import User from '../models/User';

const router = Router();

router.use(protect);
router.use(authorize(['admin']));

router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

export default router;