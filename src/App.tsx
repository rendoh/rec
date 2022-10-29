import {
  addDays,
  endOfDay,
  format,
  isSameDay,
  startOfDay,
  subDays,
} from 'date-fns';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { findTasks } from './features/tasks/api';
import { CreateTaskForm } from './features/tasks/components/CreateTaskForm';
import { UpdateTaskForm } from './features/tasks/components/UpdateTaskForm';
import { Task } from './features/tasks/schemas';

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

function useTasks() {
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

export const App: FC = () => {
  const [today] = useState<Readonly<Date>>(() => new Date());
  const { tasks, reloadTasks, next, prev, currentDate } = useTasks();
  const isToday = isSameDay(today, currentDate);

  return (
    <div>
      <header>
        <button onClick={prev}>PREV</button>
        {format(currentDate, 'yyyy/MM/dd')}
        <button onClick={next}>NEXT</button>
      </header>
      {tasks.map((task) => (
        <UpdateTaskForm key={task.id} task={task} onComplete={reloadTasks} />
      ))}
      {isToday && <CreateTaskForm onComplete={reloadTasks} />}
    </div>
  );
};
