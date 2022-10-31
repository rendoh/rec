import { useEffect, useState } from 'react';

export function useEverySecond(stop = false) {
  const [currentDate, setCurrentDate] = useState(() => new Date());
  useEffect(() => {
    if (stop) return;
    const intervalId = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => clearInterval(intervalId);
  }, [stop]);

  return currentDate;
}
