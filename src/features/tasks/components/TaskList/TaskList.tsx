import { FC } from 'react';
import { Task } from '../../schemas';
import { UpdateTaskForm } from '../UpdateTaskForm';
import { motion } from 'framer-motion';
import * as styles from './TaskList.css';

export type TaskListProps = {
  tasks: Task[];
};

export const TaskList: FC<TaskListProps> = ({ tasks }) => (
  <div className={styles.list}>
    {tasks.map((task) => (
      <motion.div key={task.id} layout>
        <UpdateTaskForm task={task} />
      </motion.div>
    ))}
  </div>
);
