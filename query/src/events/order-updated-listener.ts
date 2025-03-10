import { ResolvedEvent, StreamingRead } from '@eventstore/db-client';
import { OrderUpdated } from '../types/events';
import { Listener } from './base-listener';
import Order from '../models/order';

export class OrderUpdatedListener extends Listener<OrderUpdated> {
  readonly stream = 'ORDER_UPDATED_STREAM';
  readonly type = 'OrderUpdated';

  async onMessage(event: OrderUpdated['data']): Promise<void> {
    // Simulate async event processing
    console.log('Order updating...', event);

    if (!event.data.id.match(/^[0-9a-fA-F]{24}$/)) {
      console.log('ID invalid');
      return;
    }
    const order = await Order.findById(event.data.id);

    if (!order) {
      console.log('Order not found');
      return;
    }
    order.set('name', event.data.name);
    order.set('productId', event.data.productId);
    order.set('totalAmount', event.data.totalAmount);
    await order.save();
    console.log('QUERY - ORDER UPDATED:', { event });
    // setTimeout(async () => {
    // }, 5000);
  }
}
