import { FC, useCallback } from 'react';
import { BsPlay } from 'react-icons/bs';
import { createTask } from '../../api';
import { motion } from 'framer-motion';
import * as styles from './DailyTasksSidebar.css';

export type DailyTasksSidebarProps = {
  taskTitles: string[];
  onCreate?: () => void; // TODO: use context
};
export const DailyTasksSidebar: FC<DailyTasksSidebarProps> = ({
  taskTitles,
  onCreate,
}) => (
  <div className={styles.root}>
    <p className={styles.heading}>最近のタスク</p>
    <div className={styles.list}>
      {taskTitles.map((title) => (
        <StartButton key={title} onCreate={onCreate}>
          {title}
        </StartButton>
      ))}
    </div>
  </div>
);

const StartButton: FC<{ children: string; onCreate?: () => void }> = ({
  children,
  onCreate,
}) => {
  const handleClick = useCallback(async () => {
    // TODO: handle error
    await createTask({
      title: children,
      started_at: new Date(),
    });
    onCreate?.();
  }, [children, onCreate]);

  return (
    <motion.button
      className={styles.button}
      type="button"
      onClick={handleClick}
      layout
    >
      <BsPlay className={styles.playIcon} />
      {children}
    </motion.button>
  );
};
