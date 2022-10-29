import { format, isSameDay } from 'date-fns';
import { FC, useState } from 'react';
import { CreateTaskForm } from '../CreateTaskForm';
import { TaskList } from '../TaskList';
import { useDailyTasks } from './DailyTasks.hooks';
import * as styles from './DailyTasks.css';
import { IconButton } from '../../../../components/IconButton';
import { Classes, IconSize } from '@blueprintjs/core';
import clsx from 'clsx';

type MonthNavButtonProps = {
  icon:
    | 'chevron-left'
    | 'chevron-right'
    | 'double-chevron-left'
    | 'double-chevron-right';
  label: string;
  onClick: () => void;
};
const MonthNavButton: FC<MonthNavButtonProps> = ({ icon, label, onClick }) => (
  <IconButton
    minimal
    large
    icon={icon}
    onClick={onClick}
    aria-label={label}
    iconProps={{
      size: IconSize.LARGE,
    }}
  />
);

export const DailyTasks: FC = () => {
  const {
    tasks,
    reloadTasks,
    nextDay,
    prevDay,
    nextMonth,
    prevMonth,
    currentDate,
  } = useDailyTasks();
  const [today] = useState<Readonly<Date>>(() => new Date());
  const isToday = isSameDay(today, currentDate);

  return (
    <div>
      <header className={styles.header}>
        <MonthNavButton
          icon="double-chevron-left"
          label="Previous month"
          onClick={prevMonth}
        />
        <MonthNavButton
          icon="chevron-left"
          label="Previous day"
          onClick={prevDay}
        />
        <p className={clsx(Classes.MONOSPACE_TEXT, styles.date)}>
          {format(currentDate, 'yyyy/MM/dd')}
        </p>
        <MonthNavButton
          icon="chevron-right"
          label="Next day"
          onClick={nextDay}
        />
        <MonthNavButton
          icon="double-chevron-right"
          label="Next month"
          onClick={nextMonth}
        />
      </header>
      <TaskList tasks={tasks} onUpdate={reloadTasks}>
        {isToday && <CreateTaskForm onComplete={reloadTasks} />}
      </TaskList>
    </div>
  );
};
