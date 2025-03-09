import express from 'express';
import { eventStoreClient } from './event-store';
import { jsonEvent } from '@eventstore/db-client';
import { OrderCancelled, OrderCreated, OrderUpdated } from './types/events';
import { randomUUID } from 'crypto';

const app = express();

app.use(express.json());

app.post('/orders', async (req: express.Request, res: express.Response) => {
  const { name, productId, totalAmount } = req.body;

  const orderCreatedEvent = jsonEvent<OrderCreated>({
    type: 'OrderCreated',
    data: {
      id: randomUUID(),
      name,
      productId,
      totalAmount,
    },
  });
  await eventStoreClient.appendToStream(
    'ORDER_CREATED_STREAM',
    orderCreatedEvent
  );
  res.status(202).json({ message: 'Order created', orderCreatedEvent });
});

app.put('/orders/:id', async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const { name, productId, totalAmount } = req.body;

  const orderUpdatedEvent = jsonEvent<OrderUpdated>({
    type: 'OrderUpdated',
    data: {
      id,
      name,
      productId,
      totalAmount,
    },
  });
  await eventStoreClient.appendToStream(
    'ORDER_UPDATED_STREAM',
    orderUpdatedEvent
  );
  res.status(202).json({ message: 'Order updated', orderUpdatedEvent });
});

app.delete(
  '/orders/:id',
  async (req: express.Request, res: express.Response) => {
    const { id } = req.params;

    const orderCancelledEvent = jsonEvent<OrderCancelled>({
      type: 'OrderCancelled',
      data: {
        id,
      },
    });
    await eventStoreClient.appendToStream(
      'ORDER_CANCELLED_STREAM',
      orderCancelledEvent
    );
    res.status(202).json({ message: 'Order cancelled', orderCancelledEvent });
  }
);

export { app };
