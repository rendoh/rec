import {
  addDays,
  addMonths,
  endOfDay,
  startOfDay,
  startOfMonth,
  subDays,
  subMonths,
} from 'date-fns';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { findTasks } from '../../api';
import { Task } from '../../schemas';

function useDateRange(): Readonly<{
  currentDate: Date;
  nextDay: () => void;
  prevDay: () => void;
  nextMonth: () => void;
  prevMonth: () => void;
  from: Date;
  to: Date;
}> {
  const [currentDate, setCurrentDate] = useState(() => new Date());

  const nextDay = useCallback(() => {
    setCurrentDate(addDays(currentDate, 1));
  }, [currentDate]);
  const prevDay = useCallback(() => {
    setCurrentDate(subDays(currentDate, 1));
  }, [currentDate]);
  const nextMonth = useCallback(() => {
    setCurrentDate(addMonths(startOfMonth(currentDate), 1));
  }, [currentDate]);
  const prevMonth = useCallback(() => {
    setCurrentDate(subMonths(startOfMonth(currentDate), 1));
  }, [currentDate]);

  const from = useMemo(() => startOfDay(currentDate), [currentDate]);
  const to = useMemo(() => endOfDay(currentDate), [currentDate]);

  return {
    currentDate,
    nextDay,
    prevDay,
    nextMonth,
    prevMonth,
    from,
    to,
  };
}

export function useDailyTasks() {
  const { from, to, ...rest } = useDateRange();
  const [tasks, setTasks] = useState<Task[]>([]);
  const reloadTasks = useCallback(() => {
    findTasks({ from, to }).then(setTasks);
  }, [from, to]);
  useEffect(() => {
    reloadTasks();
  }, [reloadTasks]);

  return {
    tasks,
    reloadTasks,
    ...rest,
  };
}
