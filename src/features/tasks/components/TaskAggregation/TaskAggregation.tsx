import { FC, useMemo } from 'react';
import { Task } from '../../schemas';
import { ElapsedTime } from '../ElapsedTime';
import * as styles from './TaskAggregation.css';

export type TaskAggregationProps = {
  tasks: Task[];
};

type TaskGroup = {
  title: string;
  total: number;
  lastStartedAt?: Date;
};

export const TaskAggregation: FC<TaskAggregationProps> = ({ tasks }) => {
  const grouped = useMemo(
    () =>
      tasks.reduce<TaskGroup[]>((result, task) => {
        const group: TaskGroup =
          result.find(({ title }) => title === task.title) ??
          (() => {
            const newGroup = {
              title: task.title,
              total: 0,
            };
            result.push(newGroup);
            return newGroup;
          })();

        if (task.ended_at) {
          group.total += task.ended_at.getTime() - task.started_at.getTime();
        } else {
          group.lastStartedAt = task.started_at;
        }

        return result;
      }, []),
    [tasks],
  );

  return (
    <dl className={styles.root}>
      {grouped.map((group, i) => (
        <div key={i} className={styles.row}>
          <dt className={styles.title}>{group.title}</dt>
          <dd className={styles.time}>
            <ElapsedTime duration={group.total} start={group.lastStartedAt} />
          </dd>
        </div>
      ))}
    </dl>
  );
};
