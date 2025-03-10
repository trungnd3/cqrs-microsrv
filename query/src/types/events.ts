import { JSONEventType } from "@eventstore/db-client";

export type OrderCreated = {
  stream: 'ORDER_CREATED_STREAM',
  data: JSONEventType<
  "OrderCreated",
  {
      id: string,
      name: string,
      productId: string,
      totalAmount: number
  }>
};

export type OrderUpdated = {
  stream: 'ORDER_UPDATED_STREAM',
  data: JSONEventType<
  "OrderUpdated",
  {
      id: string,
      name: string,
      productId: string,
      totalAmount: number
  }>
};

export type OrderCancelled = {
  stream: 'ORDER_CANCELLED_STREAM',
  data: JSONEventType<
  "OrderCancelled",
  {
      id: string
  }>
};
