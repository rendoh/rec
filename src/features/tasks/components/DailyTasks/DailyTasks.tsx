import { format, isSameDay } from 'date-fns';
import { FC, useCallback, useEffect, useState } from 'react';
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
import { findRecentTaskTitles } from '../../api';

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

function useRecentTaskTitles() {
  const [recentTaskTitles, setRecentTaskTitles] = useState<string[]>([]);
  const reloadRecentTaskTitles = useCallback(async () => {
    // TODO: handle error
    const titles = await findRecentTaskTitles();
    setRecentTaskTitles(titles);
  }, []);
  useEffect(() => {
    reloadRecentTaskTitles();
  }, [reloadRecentTaskTitles]);

  return {
    recentTaskTitles,
    reloadRecentTaskTitles,
  };
}

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
  const { recentTaskTitles, reloadRecentTaskTitles } = useRecentTaskTitles();

  const onUpdate = useCallback(() => {
    reloadTasks();
    reloadRecentTaskTitles();
  }, [reloadRecentTaskTitles, reloadTasks]);

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
          {format(currentDate, 'yyyy/MM/dd (iii)')}
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
      <TaskList tasks={tasks} onUpdate={onUpdate}>
        {isToday && (
          <CreateTaskForm
            recentTaskTitles={recentTaskTitles}
            onComplete={onUpdate}
          />
        )}
      </TaskList>
    </div>
  );
};
