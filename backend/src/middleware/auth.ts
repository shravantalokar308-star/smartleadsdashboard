import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import asyncHandler from 'express-async-handler';
import { findById } from '../services/authService';

export const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) { res.status(401).json({ message: 'Unauthorized' }); return; }
  const token = auth.split(' ')[1];
  try {
    const payload: any = jwt.verify(token, config.jwtSecret);
    const user = await findById(payload.id);
    if (!user) { res.status(401).json({ message: 'Unauthorized' }); return; }
    req.user = { id: user._id.toString(), role: user.role };
    next();
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized' }); return;
  }
});

export const authorize = (roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;
  if (!user || !roles.includes(user.role)) { res.status(403).json({ message: 'Forbidden' }); return; }
  next();
};
