import { OrderCreated } from '../types/events';
import { Listener } from './base-listener';
import Order from '../models/order';

export class OrderCreatedListener extends Listener<OrderCreated> {
  readonly stream = 'ORDER_CREATED_STREAM';
  readonly type = 'OrderCreated';

  async onMessage(event: OrderCreated['data']): Promise<void> {
    // Simulate async event processing
    console.log('Order creating...', event);
    const order = Order.build({
      id: event.data.id,
      name: event.data.name,
      productId: event.data.productId,
      totalAmount: event.data.totalAmount,
    });
    await order.save();
    console.log('QUERY - ORDER CREATED:', { event });
    // setTimeout(async () => {
    // }, 5000);
  }
}
