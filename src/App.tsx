import { FC, useCallback, useEffect, useState } from 'react';
import { findTasks } from './features/tasks/api';
import { CreateTaskForm } from './features/tasks/components/CreateTaskForm';
import { UpdateTaskForm } from './features/tasks/components/UpdateTaskForm';
import { Task } from './features/tasks/schemas';

export const App: FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const fetchTasks = useCallback(() => {
    findTasks({
      from: new Date('1995-12-17T03:24:00'),
      to: new Date('2025-12-17T03:24:00'),
    }).then(setTasks);
  }, []);
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div>
      {tasks.map((task) => (
        <UpdateTaskForm key={task.id} task={task} onComplete={fetchTasks} />
      ))}
      <CreateTaskForm onComplete={fetchTasks} />
    </div>
  );
};
