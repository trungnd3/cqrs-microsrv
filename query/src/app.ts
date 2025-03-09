import express from 'express';
import { eventStoreClient } from './event-store';
import { FORWARDS, START } from '@eventstore/db-client';
import { OrderCreated } from './types/events';

const app = express();

app.use(express.json());

app.get('/orders', async (req: express.Request, res: express.Response) => {
  const events = eventStoreClient.readStream<OrderCreated>('ORDER_CREATED_STREAM', {
    direction: FORWARDS,
    fromRevision: START,
    maxCount: 10,
  });

  for await (const resolvedEvent of events) {
    if (resolvedEvent.event?.type.startsWith("$")) {
      continue;
    }

    console.log(resolvedEvent.event);
  }

  res.status(200).json({ events });
});

export { app };
