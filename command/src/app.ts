import express from 'express';
import { OrderCreatedPublisher } from './events/order-created-publisher';
import { OrderUpdatedPublisher } from './events/order-updated-publisher';
import { OrderCancelledPublisher } from './events/order-cancelled-publisher';
import Order from './models/order';

const app = express();

app.use(express.json());

app.post('/orders', async (req: express.Request, res: express.Response) => {
  const { name, productId, totalAmount } = req.body;

  const order = Order.build({
    name,
    productId,
    totalAmount,
  });
  await order.save();
  console.log('COMMAND - ORDER CREATED:', {
    id: order.id,
    name: order.name,
    productId: order.productId,
    totalAmount: totalAmount,
  });

  new OrderCreatedPublisher().publish({
    type: 'OrderCreated',
    data: {
      id: order.id,
      name: order.name,
      productId: order.productId,
      totalAmount: order.totalAmount,
    },
  });

  res
    .status(202)
    .json({
      message: 'Order created',
      data: {
        id: order.id,
        name: order.name,
        productId: order.productId,
        totalAmount: order.totalAmount,
      },
    });
});

app.put('/orders/:id', async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const { name, productId, totalAmount } = req.body;

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    res.status(400).json({ message: 'ID invalid' });
    return;
  }

  const order = await Order.findById(id);
  if (!order) {
    res.status(400).json({ message: 'Order not exist' });
    return;
  }

  order.set('name', name);
  order.set('productId', productId);
  order.set('totalAmount', totalAmount);
  await order.save();

  console.log('COMMAND - ORDER UPDATED:', {
    id: order.id,
    name: order.name,
    productId: order.productId,
    totalAmount: totalAmount,
  });

  new OrderUpdatedPublisher().publish({
    type: 'OrderUpdated',
    data: {
      id,
      name,
      productId,
      totalAmount,
    },
  });

  res.status(202).json({
    message: 'Order updated',
    data: {
      id: order.id,
      name: order.name,
      productId: order.productId,
      totalAmount: order.totalAmount,
    },
  });
});

app.delete(
  '/orders/:id',
  async (req: express.Request, res: express.Response) => {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(400).json({ message: 'ID invalid' });
      return;
    }

    await Order.findByIdAndDelete(id);

    console.log('COMMAND - ORDER DELETED:', {
      id,
    });

    new OrderCancelledPublisher().publish({
      type: 'OrderCancelled',
      data: {
        id,
      },
    });

    res.status(202).json({ message: 'Order cancelled', data: { id } });
  }
);

export { app };
