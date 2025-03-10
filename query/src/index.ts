import mongoose from 'mongoose';
import { app } from './app';
import { OrderCancelledListener } from './events/order-cancelled-listener';
import { OrderCreatedListener } from './events/order-created-listener';
import { OrderUpdatedListener } from './events/order-updated-listener';

async function start() {
  if (!process.env.EVENTSTORE_URL) {
    throw new Error('EVENTSTORE_URL does not exist.');
  }

  if (!process.env.ME_CONFIG_MONGODB_URL) {
    throw new Error('ME_CONFIG_MONGODB_URL not configured.');
  }

  // async code
  new OrderCreatedListener().listen();
  new OrderUpdatedListener().listen();
  new OrderCancelledListener().listen();

  await mongoose.connect(process.env.ME_CONFIG_MONGODB_URL);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

start();
