import { JSONEventType } from '@eventstore/db-client';
import { eventStoreClient } from '../event-store';

interface CustomEvent {
  stream: string;
  data: JSONEventType;
}

export abstract class Listener<T extends CustomEvent> {
  abstract stream: T['stream'];
  abstract type: T['data']['type'];
  abstract onMessage(event: T['data']): void;

  async listen() {
    // Get the latest event

    const subscription = eventStoreClient.subscribeToStream<T['data']>(
      this.stream
    );

    for await (const { event } of subscription) {
      if (!event) {
        continue;
      }
      console.log(
        `Received event ${event.revision}@${event.streamId}: ${JSON.stringify(
          event.data
        )}`
      );

      this.onMessage(event);
    }
  }
}
