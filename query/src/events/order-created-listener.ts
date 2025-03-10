import { ResolvedEvent, StreamingRead } from '@eventstore/db-client';
import { OrderCreated } from '../types/events';
import { Listener } from './base-listener';
import Order from '../models/order';

export class OrderCreatedListener extends Listener<OrderCreated> {
  readonly stream = 'ORDER_CREATED_STREAM';
  readonly type = 'OrderCreated';

  onMessage({ data }: OrderCreated['data']): void {
    // Simulate async event processing
    setTimeout(async () => {
      const order = Order.build(data);
      await order.save();
      console.log('QUERY - ORDER CREATED:', { data });
    }, 5000);
  }
}
