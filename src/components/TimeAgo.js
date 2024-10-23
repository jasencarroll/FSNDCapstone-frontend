import { useState, useEffect, useMemo } from 'react';

const units = [
  { unit: 'year', seconds: 60 * 60 * 24 * 365 },
  { unit: 'month', seconds: 60 * 60 * 24 * 30 },
  { unit: 'week', seconds: 60 * 60 * 24 * 7 },
  { unit: 'day', seconds: 60 * 60 * 24 },
  { unit: 'hour', seconds: 60 * 60 },
  { unit: 'minute', seconds: 60 },
  { unit: 'second', seconds: 1 },
];

const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' });

function getTimeAgo(date) {
  const now = new Date();
  const secondsElapsed = Math.round((date.getTime() - now.getTime()) / 1000);
  const absSeconds = Math.abs(secondsElapsed);

  for (const { unit, seconds: unitSeconds } of units) {
    if (absSeconds >= unitSeconds || unit === 'second') {
      const time = Math.round(secondsElapsed / unitSeconds);
      // Set interval to update component half as often as the unit or at least every minute
      const interval = Math.min(unitSeconds / 2, 60);
      return { time, unit, interval };
    }
  }
}

export default function TimeAgo({ isoDate }) {
  // Memoize the date object so that it only recalculates when isoDate changes
  const date = useMemo(() => new Date(Date.parse(isoDate)), [isoDate]);

  const [timeAgo, setTimeAgo] = useState(() => getTimeAgo(date));

  useEffect(() => {
    const update = () => setTimeAgo(getTimeAgo(date));

    const intervalId = setInterval(update, timeAgo.interval * 1000);

    return () => clearInterval(intervalId);
  }, [date, timeAgo.interval]);

  return (
    <span title={date.toString()}>
      {rtf.format(timeAgo.time, timeAgo.unit)}
    </span>
  );
}
