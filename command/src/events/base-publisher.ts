import { jsonEvent, JSONEventType } from '@eventstore/db-client';
import { eventStoreClient } from '../event-store';

interface CustomEvent {
  stream: string;
  data: JSONEventType;
}

export abstract class Publisher<T extends CustomEvent> {
  abstract stream: T['stream'];

  async publish(event: T['data']) {
    await eventStoreClient.appendToStream(
      this.stream,
      jsonEvent<T['data']>(event)
    );
  }
}
