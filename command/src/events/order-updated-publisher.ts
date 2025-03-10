import { OrderUpdated } from '../types/events';
import { Publisher } from './base-publisher';

export class OrderUpdatedPublisher extends Publisher<OrderUpdated> {
  readonly stream = 'ORDER_UPDATED_STREAM';
}
