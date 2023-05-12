import dayjs from 'dayjs';
import * as chrono from 'chrono-node';

export const stringToDate = (string, timezone = 'Etc/GMT') => {
  const localTime = dayjs(new Date(), timezone)
  const localOffset = localTime.utcOffset();
  const custom = chrono.casual.clone();
  custom.refiners.push({
    refine: (context, results) => {
      results.forEach((result) => {
        result.start.imply('timezoneOffset', localOffset)
        result.end && result.end.imply('timezoneOffset', localOffset)
      })
      return results
    }
  });
  const date = custom.parseDate(string);
  if (!date) return null;
  return dayjs(date).toISOString();
};
