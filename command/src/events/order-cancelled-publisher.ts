import { OrderCancelled } from "../types/events";
import { Publisher } from "./base-publisher";

export class OrderCancelledPublisher extends Publisher<OrderCancelled> {
  readonly stream = 'ORDER_CANCELLED_STREAM';
}
