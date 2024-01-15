export default class SearchMethods {
  static searchByDateFields(array, startDate, endDate, fields) {
    return array.filter((item) => {
      const matches = fields.map((field) => {
        const MIN_DATE = new Date(-8640000000000000);
        const MAX_DATE = new Date(8640000000000000);
        const start = startDate ? new Date(startDate) : MIN_DATE;
        const end = endDate ? new Date(endDate) : MAX_DATE;
        const check = new Date(item[field]);

        if (endDate) {
          end.setHours(23);
          end.setMinutes(59);
          end.setSeconds(59);
          end.setMilliseconds(999);
        }

        if (startDate) {
          end.setHours(0);
          end.setMinutes(0);
          end.setSeconds(0);
          end.setMilliseconds(0);
        }

        return check >= start && check <= end;
      });

      return !!matches.find((match) => match);
    });
  }
  static searchByStringFields = (array, query, fields) => {
    return array.filter((item) => {
      const matches = fields.map((field) => {
        return item[field] && item[field].toString().toLowerCase().includes(query.toLowerCase());
      });

      return !!matches.find((match) => match);
    });
  };

  static findMostRecentEvent = (events) => {
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

  static findFirstRequestEvent = (events) => {
    if (!events || events.length === 0) {
      return null;
    }

    const requestEvent = events.find((event) => event.eventType.includes('REQUEST'));
    return requestEvent || null;
  };
}
