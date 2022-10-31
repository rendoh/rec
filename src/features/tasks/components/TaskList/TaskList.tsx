import { FC } from 'react';
import { Task } from '../../schemas';
import { UpdateTaskForm } from '../UpdateTaskForm';
import * as styles from './TaskList.css';

export type TaskListProps = {
  tasks: Task[];
  onUpdate: () => void;
};

export const TaskList: FC<TaskListProps> = ({ tasks, onUpdate }) => (
  <div className={styles.list}>
    {tasks.map((task) => (
      <UpdateTaskForm key={task.id} task={task} onComplete={onUpdate} />
    ))}
  </div>
);
