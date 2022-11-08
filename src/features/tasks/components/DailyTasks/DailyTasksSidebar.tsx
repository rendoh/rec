import { FC, useCallback } from 'react';
import { BsPlay } from 'react-icons/bs';
import { createTask } from '../../api';
import { motion } from 'framer-motion';
import * as styles from './DailyTasksSidebar.css';
import { useFetchTasks, useTasks } from '../../state/tasks';
import { handleErrorMessages } from '../../../../components/ErrorToaster';
import { useIsCurrentDateToday, useToToday } from '../../state/currentDate';

export const DailyTasksSidebar: FC = () => {
  const { recentTasks } = useTasks();

  return (
    <div className={styles.root}>
      <p className={styles.heading}>最近のタスク</p>
      <div className={styles.list}>
        {recentTasks.map((title) => (
          <StartButton key={title}>{title}</StartButton>
        ))}
      </div>
    </div>
  );
};

const StartButton: FC<{ children: string }> = ({ children }) => {
  const toToday = useToToday();
  const isToday = useIsCurrentDateToday();
  const fetchTasks = useFetchTasks();
  const startTask = useCallback(async () => {
    try {
      await createTask({
        title: children,
        started_at: new Date(),
      });
    } catch (error: unknown) {
      handleErrorMessages(error);
    }
    fetchTasks();
    if (!isToday) {
      toToday();
    }
  }, [children, fetchTasks, isToday, toToday]);

  return (
    <motion.button
      className={styles.button}
      type="button"
      onClick={startTask}
      layout
    >
      <BsPlay className={styles.playIcon} />
      {children}
    </motion.button>
  );
};
