import { useEffect, useState } from 'react';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';

dayjs.extend(duration);
dayjs.extend(utc);

export const TimeCell = ({ time, id, updateInfo }) => {
  const [timeDifference, setTimeDifference] = useState('');

  useEffect(() => {
    if (time && !timeDifference.length) {
      setTimeout(() => {
        updateInfo();
      }, 500);
    }
  }, [timeDifference]);

  useEffect(() => {
    if (!time) return;
    const timer = setInterval(() => {
      const now = dayjs().utc();
      const targetTime = dayjs(time).utc();
      const diff = targetTime.diff(now);

      if (diff <= 0) {
        clearInterval(timer);
        setTimeDifference('');
        return;
      }

      const diffDuration = dayjs.duration(diff);
      const hours = String(diffDuration.hours()).padStart(2, '0');
      const minutes = String(diffDuration.minutes()).padStart(2, '0');
      const seconds = String(diffDuration.seconds()).padStart(2, '0');
      updateInfo();
      setTimeDifference(`${hours}:${minutes}:${seconds}`);
    }, 300);

    return () => clearInterval(timer);
  }, [time, id]);

  return <>{timeDifference}</>;
};
