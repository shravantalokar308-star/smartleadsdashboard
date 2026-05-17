import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT ? Number(process.env.PORT) : 4000,
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/smart_leads',
  jwtSecret: process.env.JWT_SECRET || 'change_this',
  jwtExpires: process.env.JWT_EXPIRES_IN || '1d'
};

export default config;
