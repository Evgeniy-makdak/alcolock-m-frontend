import {useEffect, useState} from "react";
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {hideExpiredItems} from "../../../../internal/effector/auto_service/effects";
dayjs.extend(duration)
const TimeCell = ({time, id}) => {
  const [timeDifference, setTimeDifference] = useState('');


  useEffect(() => {
    if (!time) return
    const timer = setInterval(() => {
      const now = dayjs();
      const targetTime = dayjs(time);
      const diff = targetTime.diff(now);

      if (diff <= 0) {
        clearInterval(timer)
        setTimeDifference('')
        hideExpiredItems(id)
        return
      }

      const diffDuration = dayjs.duration(diff);
      const hours = String(diffDuration.hours()).padStart(2, '0');
      const minutes = String(diffDuration.minutes()).padStart(2, '0');
      const seconds = String(diffDuration.seconds()).padStart(2, '0');

      setTimeDifference(`${hours}:${minutes}:${seconds}`);
    }, 500);

    return () => clearInterval(timer);
  }, [time, id]);


  return (
    <>
      {timeDifference}
    </>
  )
}

export default TimeCell
