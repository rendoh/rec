import { format, isSameDay } from 'date-fns';
import { FC, useCallback } from 'react';
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
import { IconButton } from '../../../../components/_IconButton';
import {
  Button,
  Card,
  Classes,
  Dialog,
  Icon,
  IconSize,
  NonIdealState,
  Spinner,
  Switch,
} from '@blueprintjs/core';
import clsx from 'clsx';
import { TaskAggregator } from '../TaskAggregator';
import { ja } from 'date-fns/locale';
import { DailyTasksHeader } from './DailyTasksHeader';

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
    isLoading,
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

  return (
    <div className={styles.root}>
      <DailyTasksHeader
        date={currentDate}
        onPrevMonthClick={prevMonth}
        onPrevDateClick={prevDay}
        onNextDateClick={nextDay}
        onNextMonthClick={nextMonth}
        onTodayClick={toToday}
        disabledToday={isToday}
      />
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
          {format(currentDate, 'yyyy/MM/dd (iii)', {
            locale: ja,
          })}
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

      <div className={styles.content}>
        {isLoading && (
          <div className={styles.spinnerWrapper}>
            <Spinner />
          </div>
        )}
        {tasks.length > 0 ? (
          <>
            <div className={styles.actions}>
              <Button icon="th-filtered" onClick={openAggregationModal}>
                集計
              </Button>
            </div>
            <TaskList tasks={tasks} onUpdate={handleUpdate} />
          </>
        ) : (
          <NonIdealState
            className={styles.empty}
            icon="th-disconnect"
            title="Not found"
            description="該当の日付にタスクが見つかりませんでした"
          />
        )}
      </div>

      {isToday && (
        <div className={styles.footer}>
          <CreateTaskForm
            recentTaskTitles={recentTaskTitles}
            onComplete={handleUpdate}
          />
        </div>
      )}

      <Dialog
        isOpen={isAggregationModalOpen}
        title={`${format(today, 'yyyy/MM/dd')} のタスク集計結果`}
        onClose={closeAggregationModal}
      >
        <div className={styles.dialogContent}>
          <TaskAggregator tasks={tasks} />
        </div>
      </Dialog>
    </div>
  );
};
