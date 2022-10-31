import { format, isSameDay } from 'date-fns';
import { FC, useCallback, useRef } from 'react';
import { CreateTaskForm } from '../CreateTaskForm';
import { TaskList } from '../TaskList';
import {
  useDailyTasks,
  useDialogState,
  useRecentTaskTitles,
  useToday,
  useToggleTheme,
} from './DailyTasks.hooks';
import * as styles from './DailyTasks.css';
import { IconButton } from '../../../../components/IconButton';
import {
  Button,
  Card,
  Classes,
  Dialog,
  Icon,
  IconSize,
  NonIdealState,
  Switch,
} from '@blueprintjs/core';
import clsx from 'clsx';
import { TaskAggregator } from '../TaskAggregator';

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
  const { recentTaskTitles, reloadRecentTaskTitles } = useRecentTaskTitles();
  const {
    isOpen: isAggregationModalOpen,
    openDialog: openAggregationModal,
    closeDialog: closeAggregationModal,
  } = useDialogState();

  const handleUpdate = useCallback(() => {
    reloadTasks();
    reloadRecentTaskTitles();
  }, [reloadRecentTaskTitles, reloadTasks]);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const handleCreateCompleted = useCallback(() => {
    handleUpdate();
    scrollContainerRef.current?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [handleUpdate]);

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

      <div className={styles.content} ref={scrollContainerRef}>
        {tasks.length > 0 ? (
          <div className={styles.actions}>
            <Button icon="th-filtered" onClick={openAggregationModal}>
              Aggregate
            </Button>
          </div>
        ) : (
          <NonIdealState
            className={styles.empty}
            icon="th-disconnect"
            title="No tasks"
            description="No tasks were found for this day."
          />
        )}
        <TaskList tasks={tasks} onUpdate={handleUpdate} />
      </div>

      {isToday && (
        <div className={styles.footer}>
          <CreateTaskForm
            recentTaskTitles={recentTaskTitles}
            onComplete={handleCreateCompleted}
          />
        </div>
      )}

      <Dialog
        isOpen={isAggregationModalOpen}
        title={format(today, 'yyyy/MM/dd')}
        onClose={closeAggregationModal}
      >
        <div className={styles.dialogContent}>
          <TaskAggregator tasks={tasks} />
        </div>
      </Dialog>
    </div>
  );
};
