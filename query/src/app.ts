import express from 'express';
import Order from './models/order';

const app = express();

app.use(express.json());

app.get('/orders', async (req: express.Request, res: express.Response) => {
  const orders = await Order.find();

  res.status(200).json({ orders });
});

export { app };
