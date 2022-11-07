import { format, isSameDay } from 'date-fns';
import { FC, useCallback } from 'react';
import { TaskList } from '../TaskList';
import {
  useDailyTasks,
  useDialogState,
  useRecentTaskTitles,
  useToday,
  useToggleTheme,
} from './DailyTasks.hooks';
import * as styles from './DailyTasks.css';
import { TaskAggregator } from '../TaskAggregator';
import { DailyTasksHeader } from './DailyTasksHeader';
import { Button } from '../../../../components/Button';
import { BsFilterLeft } from 'react-icons/bs';
import { Modal } from '../../../../components/Modal';
import { DailyTasksSidebar } from './DailyTasksSidebar';
import { DailyTasksContent } from './DailyTasksContent';

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
      <div className={styles.sidebar}>
        <DailyTasksSidebar
          taskTitles={recentTaskTitles}
          onCreate={handleUpdate}
        />
      </div>
      <div className={styles.header}>
        <DailyTasksHeader
          date={currentDate}
          onPrevMonthClick={prevMonth}
          onPrevDateClick={prevDay}
          onNextDateClick={nextDay}
          onNextMonthClick={nextMonth}
          onTodayClick={toToday}
          disabledToday={isToday}
        />
      </div>
      <div className={styles.content}>
        <DailyTasksContent
          showCreateForm={isToday}
          tasks={tasks}
          onUpdate={handleUpdate}
          isLoading={isLoading}
        />
        <div style={{ display: 'none' }}>
          {isLoading && (
            <div className={styles.spinnerWrapper}>
              <div className={styles.spinner} />
            </div>
          )}
          {tasks.length > 0 ? (
            <>
              <div className={styles.actions}>
                <Button
                  leftIcon={<BsFilterLeft />}
                  onClick={openAggregationModal}
                  border
                >
                  集計
                </Button>
              </div>
              <TaskList tasks={tasks} onUpdate={handleUpdate} />
            </>
          ) : (
            <div>hi</div>
          )}
        </div>
      </div>

      <Modal
        header={`${format(today, 'yyyy/MM/dd')} のタスク集計結果`}
        isOpen={isAggregationModalOpen}
        onClose={closeAggregationModal}
      >
        <TaskAggregator tasks={tasks} />
      </Modal>
    </div>
  );
};
