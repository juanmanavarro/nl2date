import * as chrono from 'chrono-node';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';

dayjs.extend(utc);
dayjs.extend(timezone);

export const stringToDate = (string) => {
  const date = chrono.casual.parseDate(string, {
    timezone: 'GMT',
  });

  if ( !date ) return null;

  return dayjs(date).toISOString();
};
