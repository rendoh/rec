import { addDays, endOfDay, startOfDay, subDays } from 'date-fns';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { findTasks } from '../../api';
import { Task } from '../../schemas';

function useDateRange(): Readonly<{
  currentDate: Date;
  next: () => void;
  prev: () => void;
  from: Date;
  to: Date;
}> {
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const next = useCallback(() => {
    setCurrentDate(addDays(currentDate, 1));
  }, [currentDate]);
  const prev = useCallback(() => {
    setCurrentDate(subDays(currentDate, 1));
  }, [currentDate]);

  const from = useMemo(() => startOfDay(currentDate), [currentDate]);
  const to = useMemo(() => endOfDay(currentDate), [currentDate]);

  return {
    currentDate,
    next,
    prev,
    from,
    to,
  };
}

export function useDailyTasks() {
  const { from, to, next, prev, currentDate } = useDateRange();
  const [tasks, setTasks] = useState<Task[]>([]);
  const reloadTasks = useCallback(() => {
    findTasks({ from, to }).then(setTasks);
  }, [from, to]);
  useEffect(() => {
    reloadTasks();
  }, [reloadTasks]);

  return {
    currentDate,
    tasks,
    reloadTasks,
    next,
    prev,
  };
}
