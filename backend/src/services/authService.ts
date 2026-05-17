import User, { IUser } from '../models/User';

export const findById = async (id: string) => User.findById(id).select('-password');
export const findByEmail = async (email: string) => User.findOne({ email });
