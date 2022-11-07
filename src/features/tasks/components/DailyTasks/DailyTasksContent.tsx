import { FC } from 'react';
import { BsCheck2Square } from 'react-icons/bs';
import { Task } from '../../schemas';
import { CreateTaskForm } from '../CreateTaskForm';
import { TaskList } from '../TaskList';
import * as styles from './DailyTasksContent.css';

export type DailyTasksContentProps = {
  tasks: Task[];
  onUpdate: () => void;
  showCreateForm: boolean;
  isLoading: boolean;
};

export const DailyTasksContent: FC<DailyTasksContentProps> = ({
  tasks,
  onUpdate,
  showCreateForm,
  isLoading,
}) => {
  return (
    <div className={styles.root}>
      {showCreateForm && (
        <div className={styles.header}>
          <CreateTaskForm onComplete={onUpdate} />
        </div>
      )}
      <div className={styles.content}>
        {tasks.length > 0 ? (
          <TaskList tasks={tasks} onUpdate={onUpdate} />
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
