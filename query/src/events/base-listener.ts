import {
  BACKWARDS,
  END,
  FORWARDS,
  JSONEventType,
  ResolvedEvent,
  START,
  StreamingRead,
} from '@eventstore/db-client';
import { eventStoreClient } from '../event-store';

interface CustomEvent {
  stream: string;
  data: JSONEventType;
}

// TODO: Find a solution to get all event that match a type
// async function findLatest(streamName: string, batchSize = 100, fromRevision = END) {
//   const events = eventStoreClient.readStream(streamName, {
//     fromRevision,    // Start from END (latest)
//     direction: BACKWARDS, // Read newest to oldest
//     maxCount: batchSize,  // Read a batch at a time
//   });

//   let lastEventRevision = null;

//   for await (const { event } of events) {
//     if (!event) {
//       continue;
//     }

//     if (event && event.type === "ORDER_CREATED") {
//       return event; // Return the first matching event found
//     }
//     lastEventRevision = Number(event.revision); // Track last read event revision
//   }

//   // If no match found and there are more events, continue reading
//   if (lastEventRevision !== null && lastEventRevision > 0) {
//     return findLatest(streamName, batchSize, lastEventRevision - 1);
//   }

//   return null; // No matching event found
// }

export abstract class Listener<T extends CustomEvent> {
  abstract stream: T['stream'];
  abstract type: T['data']['type'];
  abstract onMessage(event: T['data']): void;

  async listen() {
    // Get the latest event
    const resolvedEvents = eventStoreClient.readStream<T['data']>(this.stream, {
      direction: BACKWARDS, // Read in reverse order
      fromRevision: END, // Start from the end
      maxCount: 100, // Get latest one
    });

    for await (const { event } of resolvedEvents) {
      if (!event) {
        continue;
      }
      if (event.type.startsWith('$')) {
        continue;
      }
      if (event.type === this.type) {
        this.onMessage(event);
        return;
      }
    }
  }
}
