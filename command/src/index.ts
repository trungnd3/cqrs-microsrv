import mongoose from 'mongoose';
import { app } from './app';

async function start() {
  if (!process.env.EVENTSTORE_URL) {
    throw new Error('EVENTSTORE_URL does not exist.');
  }

  if (!process.env.ME_CONFIG_MONGODB_URL) {
    throw new Error('ME_CONFIG_MONGODB_URL not configured.');
  }

  await mongoose.connect(process.env.ME_CONFIG_MONGODB_URL);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

start();
