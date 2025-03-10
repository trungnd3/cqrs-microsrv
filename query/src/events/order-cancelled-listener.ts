import { ResolvedEvent, StreamingRead } from '@eventstore/db-client';
import { OrderCancelled } from '../types/events';
import { Listener } from './base-listener';
import Order from '../models/order';

export class OrderCancelledListener extends Listener<OrderCancelled> {
  readonly stream = 'ORDER_CANCELLED_STREAM';
  readonly type = 'OrderCancelled';

  async onMessage(event: OrderCancelled['data']): Promise<void> {
    // Simulate async event processing
    console.log('Order cancelling...', event);
    if (!event.data.id.match(/^[0-9a-fA-F]{24}$/)) {
      console.log('ID invalid');
      return;
    }
    const id = event.data.id;
    await Order.findByIdAndDelete(id);
    console.log('QUERY - ORDER CANCELLED:', { event });
    // setTimeout(async () => {
    // }, 5000);
  }
}
