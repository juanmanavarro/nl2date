import * as chrono from 'chrono-node';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault('UTC')

export const stringToDate = (string, timezone = 'UTC') => {
  console.log(string, timezone);
  const date = chrono.casual.parseDate(string, {
    timezone,
    instant: new Date(),
  });

  console.log(date);

  if ( !date ) return null;

  return dayjs(date, timezone).toISOString();
};
