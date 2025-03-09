import { JSONEventType } from "@eventstore/db-client";

export type OrderCreated = JSONEventType<
  "OrderCreated",
  {
      id: string,
      name: string,
      productId: string,
      totalAmount: number
  }
>;

export type OrderUpdated = JSONEventType<
  "OrderUpdated",
  {
      id: string,
      name: string,
      productId: string,
      totalAmount: number
  }
>;

export type OrderCancelled = JSONEventType<
  "OrderCancelled",
  {
      id: string
  }
>;
