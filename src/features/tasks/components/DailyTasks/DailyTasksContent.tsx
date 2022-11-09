import { AnimatePresence, motion } from 'framer-motion';
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
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={tabState}
              initial={{
                opacity: 0,
                x: tabState === 'list' ? -50 : 50,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: tabState === 'list' ? -50 : 50,
              }}
              transition={{
                ease: 'easeOut',
                duration: 0.15,
              }}
            >
              {tabState === 'list' ? (
                <TaskList tasks={tasks} />
              ) : (
                <TaskAggregation tasks={tasks} />
              )}
            </motion.div>
          </AnimatePresence>
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
