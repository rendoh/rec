import { FC } from 'react';
import { BsCheck2Square } from 'react-icons/bs';
import { useIsCurrentDateToday } from '../../state/currentDate';
import { useTasks } from '../../state/tasks';
import { CreateTaskForm } from '../CreateTaskForm';
import { TaskList } from '../TaskList';
import * as styles from './DailyTasksContent.css';

export const DailyTasksContent: FC = () => {
  const isToday = useIsCurrentDateToday();
  const { tasks, isLoading } = useTasks();

  return (
    <div className={styles.root}>
      {isToday && (
        <div className={styles.header}>
          <CreateTaskForm />
        </div>
      )}
      <div className={styles.content}>
        {tasks.length > 0 ? (
          <TaskList tasks={tasks} />
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
