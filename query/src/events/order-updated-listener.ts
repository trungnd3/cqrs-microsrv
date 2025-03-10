import { ResolvedEvent, StreamingRead } from '@eventstore/db-client';
import { OrderUpdated } from '../types/events';
import { Listener } from './base-listener';
import Order from '../models/order';

export class OrderUpdatedListener extends Listener<OrderUpdated> {
  readonly stream = 'ORDER_UPDATED_STREAM';
  readonly type = 'OrderUpdated';

  onMessage({ data }: OrderUpdated['data']): void {
    // Simulate async event processing
    setTimeout(async () => {
      const order = Order.build(data);
      await order.save();
      console.log('QUERY - ORDER UPDATED:', { data });
    }, 5000);
  }
}
