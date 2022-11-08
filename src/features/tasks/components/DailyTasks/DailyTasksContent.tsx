import { FC } from 'react';
import { BsCheck2Square } from 'react-icons/bs';
import { useIsCurrentDateToday } from '../../state/currentDate';
import { useTabState } from '../../state/tabs';
import { useTasks } from '../../state/tasks';
import { CreateTaskForm } from '../CreateTaskForm';
import { TaskAggregation } from '../TaskAggregation';
import { TaskList } from '../TaskList';
import * as styles from './DailyTasksContent.css';

export const DailyTasksContent: FC = () => {
  const isToday = useIsCurrentDateToday();
  const { tasks, isLoading } = useTasks();
  const tabState = useTabState();

  return (
    <div className={styles.root}>
      {isToday && (
        <div className={styles.header}>
          <CreateTaskForm />
        </div>
      )}
      <div className={styles.content}>
        {tasks.length > 0 ? (
          tabState === 'list' ? (
            <TaskList tasks={tasks} />
          ) : (
            <TaskAggregation tasks={tasks} />
          )
        ) : (
          !isLoading && (
            <div className={styles.empty}>
              <BsCheck2Square className={styles.emptyIcon} />
              <p className={styles.emptyHeading}>Not found</p>
              <p className={styles.emptyText}>
                該当の日付にタスクが見つかりませんでした
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};
