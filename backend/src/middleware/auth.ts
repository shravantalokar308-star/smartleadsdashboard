import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import asyncHandler from 'express-async-handler';
import { findById } from '../services/authService';

export const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ message: 'Unauthorized' });
  const token = auth.split(' ')[1];
  try {
    const payload: any = jwt.verify(token, config.jwtSecret);
    const user = await findById(payload.id);
    if (!user) return res.status(401).json({ message: 'Unauthorized' });
    // @ts-ignore
    req.user = { id: user._id.toString(), role: user.role };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
});

export const authorize = (roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  const user = req.user;
  if (!user || !roles.includes(user.role)) return res.status(403).json({ message: 'Forbidden' });
  next();
};
