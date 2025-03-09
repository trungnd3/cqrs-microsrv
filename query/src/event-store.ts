import { EventStoreDBClient } from '@eventstore/db-client';

export const eventStoreClient = EventStoreDBClient.connectionString`${process.env.EVENTSTORE_URL!}`;
