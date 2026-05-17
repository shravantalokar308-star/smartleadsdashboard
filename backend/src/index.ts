import app from './app';
import mongoose from 'mongoose';
import config from './config';

const PORT = config.port;

mongoose.connect(config.mongoURI).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((err) => {
  console.error('Mongo connection error', err);
  process.exit(1);
});
