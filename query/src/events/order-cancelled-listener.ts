import { ResolvedEvent, StreamingRead } from '@eventstore/db-client';
import { OrderCancelled } from '../types/events';
import { Listener } from './base-listener';
import Order from '../models/order';

export class OrderCancelledListener extends Listener<OrderCancelled> {
  readonly stream = 'ORDER_CANCELLED_STREAM';
  readonly type = 'OrderCancelled';

  onMessage({ data }: OrderCancelled['data']): void {
    // Simulate async event processing
    setTimeout(async () => {
      const id = data.id;
      await Order.findByIdAndDelete(id);
      console.log('QUERY - ORDER CANCELLED:', { data });
    }, 5000);
  }
}
