import { OrderCreated } from "../types/events";
import { Publisher } from "./base-publisher";

export class OrderCreatedPublisher extends Publisher<OrderCreated> {
  readonly stream = 'ORDER_CREATED_STREAM';
}
