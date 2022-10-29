import { format, isSameDay } from 'date-fns';
import { FC, useState } from 'react';
import { CreateTaskForm } from '../CreateTaskForm';
import { TaskList } from '../TaskList';
import { useDailyTasks } from './DailyTasks.hooks';

export const DailyTasks: FC = () => {
  const { tasks, reloadTasks, next, prev, currentDate } = useDailyTasks();
  const [today] = useState<Readonly<Date>>(() => new Date());
  const isToday = isSameDay(today, currentDate);

  return (
    <div>
      <header>
        <button onClick={prev}>PREV</button>
        {format(currentDate, 'yyyy/MM/dd')}
        <button onClick={next}>NEXT</button>
      </header>
      <TaskList tasks={tasks} onUpdate={reloadTasks}>
        {isToday && <CreateTaskForm onComplete={reloadTasks} />}
      </TaskList>
    </div>
  );
};
