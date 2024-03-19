import type { IEvent } from '@shared/types/BaseQueryTypes';

export class SearchMethods {
  static findMostRecentEvent = (events: IEvent[]) => {
    if (!events || events.length === 0) {
      return null;
    }

    let mostRecentEvent = events[0];
    let mostRecentTime = new Date(mostRecentEvent.reportedAt);

    events
      .filter((event) => event.eventType !== 'APP_ACKNOWLEDGED')
      .forEach((event) => {
        const eventTime = new Date(event.reportedAt);
        if (eventTime > mostRecentTime) {
          mostRecentTime = eventTime;
          mostRecentEvent = event;
        }
      });

    return mostRecentEvent;
  };

  static findFirstRequestEvent = (events: IEvent[]) => {
    if (!events || events.length === 0) {
      return null;
    }

    const requestEvent = events.find((event) => event.eventType.includes('REQUEST'));
    return requestEvent || null;
  };
}
