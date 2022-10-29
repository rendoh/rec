import { FC, PropsWithChildren } from 'react';
import { Task } from '../../schemas';
import { UpdateTaskForm } from '../UpdateTaskForm';

export type TaskListProps = {
  tasks: Task[];
  onUpdate: () => void;
};

export const TaskList: FC<PropsWithChildren & TaskListProps> = ({
  tasks,
  onUpdate,
  children,
}) => (
  <>
    {tasks.map((task) => (
      <UpdateTaskForm key={task.id} task={task} onComplete={onUpdate} />
    ))}
    {children}
  </>
);
