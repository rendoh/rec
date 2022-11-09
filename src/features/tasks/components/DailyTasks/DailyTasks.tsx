import { FC, useEffect } from 'react';
import * as styles from './DailyTasks.css';
import { DailyTasksHeader } from './DailyTasksHeader';
import { DailyTasksSidebar } from './DailyTasksSidebar';
import { DailyTasksContent } from './DailyTasksContent';
import { Composer } from '../../../../components/Composer';
import { CurrentDateProvider } from '../../state/currentDate';
import { TasksProvider, useFetchTasks } from '../../state/tasks';
import { TabsStateProvider } from '../../state/tabs';

export const DailyTasks: FC = () => (
  <Composer providers={[CurrentDateProvider, TasksProvider, TabsStateProvider]}>
    <DailyTasksRoot />
  </Composer>
);

const DailyTasksRoot: FC = () => {
  const fetchTasks = useFetchTasks();
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className={styles.root}>
      <div className={styles.sidebar}>
        <DailyTasksSidebar />
      </div>
      <div className={styles.header}>
        <DailyTasksHeader />
      </div>
      <div className={styles.content}>
        <DailyTasksContent />
      </div>
    </div>
  );
};
