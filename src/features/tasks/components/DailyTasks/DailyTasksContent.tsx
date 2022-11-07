import { FC } from 'react';
import { Task } from '../../schemas';
import { CreateTaskForm } from '../CreateTaskForm';
import { TaskList } from '../TaskList';
import * as styles from './DailyTasksContent.css';

export type DailyTasksContentProps = {
  tasks: Task[];
  onUpdate: () => void;
};

export const DailyTasksContent: FC<DailyTasksContentProps> = ({
  tasks,
  onUpdate,
}) => {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <CreateTaskForm onComplete={onUpdate} />
      </div>
      <div className={styles.content}>
        <TaskList tasks={tasks} onUpdate={onUpdate} />
      </div>
    </div>
  );
};
