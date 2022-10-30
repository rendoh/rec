import { format, isSameDay } from 'date-fns';
import { FC } from 'react';
import { CreateTaskForm } from '../CreateTaskForm';
import { TaskList } from '../TaskList';
import { useDailyTasks, useToday, useToggleTheme } from './DailyTasks.hooks';
import * as styles from './DailyTasks.css';
import { IconButton } from '../../../../components/IconButton';
import {
  Button,
  Card,
  Classes,
  Icon,
  IconSize,
  Switch,
} from '@blueprintjs/core';
import clsx from 'clsx';

type MonthNavButtonProps = {
  className?: string;
  icon:
    | 'chevron-left'
    | 'chevron-right'
    | 'double-chevron-left'
    | 'double-chevron-right';
  label: string;
  onClick: () => void;
};
const MonthNavButton: FC<MonthNavButtonProps> = ({
  className,
  icon,
  label,
  onClick,
}) => (
  <IconButton
    className={className}
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
    toToday,
    currentDate,
  } = useDailyTasks();
  const today = useToday();
  const isToday = isSameDay(today, currentDate);
  const { isLightTheme, toggleTheme } = useToggleTheme();

  return (
    <div className={styles.root}>
      <Card className={styles.header} elevation={2}>
        {!isToday && (
          <Button className={styles.todayButton} onClick={toToday}>
            Today
          </Button>
        )}
        <MonthNavButton
          className={styles.monthMoveButton}
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
          className={styles.monthMoveButton}
          icon="double-chevron-right"
          label="Next month"
          onClick={nextMonth}
        />
        <div className={styles.themeGroup}>
          <Icon icon="moon" size={10} />
          <Switch
            className={styles.themeSwitch}
            checked={isLightTheme}
            onChange={() => toggleTheme()}
          />
          <Icon icon="flash" size={10} />
        </div>
      </Card>
      <TaskList tasks={tasks} onUpdate={reloadTasks}>
        {isToday && <CreateTaskForm onComplete={reloadTasks} />}
      </TaskList>
    </div>
  );
};
