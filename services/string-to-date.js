import * as chrono from 'chrono-node';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault('UTC')

export const stringToDate = (string, timezone = 'UTC') => {
  const localTime = dayjs.tz(new Date(), timezone)
    const localOffset = localTime.utcOffset();

    const custom = chrono.casual.clone();
    custom.refiners.push({
      refine: (context, results) => {
        results.forEach((result) => {
          result.start.imply('timezoneOffset', localOffset)
          result.end && result.end.imply('timezoneOffset', localOffset)
        })
        return results;
      }});

    const date = custom.parseDate(string);
    if ( !date ) return null;

    return dayjs(date).toISOString();
};
