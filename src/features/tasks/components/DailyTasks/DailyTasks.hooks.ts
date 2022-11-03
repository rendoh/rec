import { Classes } from '@blueprintjs/core';
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
import { handleErrorMessages } from '../../../../components/ErrorToaster';
import { findRecentTaskTitles, findTasks } from '../../api';
import { Task } from '../../schemas';

function useDateRange(): Readonly<{
  currentDate: Date;
  nextDay: () => void;
  prevDay: () => void;
  nextMonth: () => void;
  prevMonth: () => void;
  toToday: () => void;
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
  const toToday = useCallback(() => {
    setCurrentDate(new Date());
  }, []);

  const from = useMemo(() => startOfDay(currentDate), [currentDate]);
  const to = useMemo(() => endOfDay(currentDate), [currentDate]);

  return {
    currentDate,
    nextDay,
    prevDay,
    nextMonth,
    prevMonth,
    toToday,
    from,
    to,
  };
}

export function useDailyTasks() {
  const { from, to, ...rest } = useDateRange();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const reloadTasks = useCallback(async () => {
    setIsLoading(true);
    try {
      const tasks = await findTasks({ from, to });
      setTasks(tasks);
    } catch (error: unknown) {
      handleErrorMessages(error);
    } finally {
      setIsLoading(false);
    }
  }, [from, to]);
  useEffect(() => {
    reloadTasks();
  }, [reloadTasks]);

  return {
    tasks,
    reloadTasks,
    isLoading,
    ...rest,
  };
}

export function useToday() {
  const [today, setToday] = useState<Readonly<Date>>(() => new Date());

  useEffect(() => {
    const now = new Date();
    const startOfNextDay = startOfDay(addDays(now, 1));
    const difference = startOfNextDay.getTime() - now.getTime();
    const timerId = setTimeout(() => {
      setToday(startOfNextDay);
    }, difference);

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  return today;
}

export function useToggleTheme() {
  const [isLightTheme, setIsLightTheme] = useState<boolean>(false);

  const toggleTheme = useCallback(() => {
    setIsLightTheme((currentValue) => {
      const isLight = !currentValue;
      document.body.classList.toggle(Classes.DARK, !isLight);
      localStorage.setItem('RECAPP_isLightTheme', isLight ? '1' : '0');
      return isLight;
    });
  }, []);

  useEffect(() => {
    if (localStorage.getItem('RECAPP_isLightTheme') === '1') {
      setIsLightTheme(true);
      document.body.classList.remove(Classes.DARK);
    }
  }, []);

  return {
    isLightTheme,
    toggleTheme,
  };
}

export function useRecentTaskTitles() {
  const [recentTaskTitles, setRecentTaskTitles] = useState<string[]>([]);
  const reloadRecentTaskTitles = useCallback(async () => {
    try {
      const titles = await findRecentTaskTitles();
      setRecentTaskTitles(titles);
    } catch (error: unknown) {
      handleErrorMessages(error);
    }
  }, []);
  useEffect(() => {
    reloadRecentTaskTitles();
  }, [reloadRecentTaskTitles]);

  return {
    recentTaskTitles,
    reloadRecentTaskTitles,
  };
}

export function useDialogState(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);
  const openDialog = useCallback(() => setIsOpen(true), []);
  const closeDialog = useCallback(() => setIsOpen(false), []);
  return {
    isOpen,
    openDialog,
    closeDialog,
  };
}
