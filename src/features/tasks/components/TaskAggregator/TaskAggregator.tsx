import { Classes } from '@blueprintjs/core';
import clsx from 'clsx';
import { FC, useMemo } from 'react';
import { useEverySecond } from '../../../../hooks/useEverySecond';
import { formatDurationTime } from '../../../../utils/formatDurationTime';
import { Task } from '../../schemas';
import * as styles from './TaskAggregator.css';

export type TaskAggregatorProps = {
  tasks: Task[];
};

type TaskGroup = {
  title: string;
  total: number;
  lastStartedAt?: Date;
};

export const TaskAggregator: FC<TaskAggregatorProps> = ({ tasks }) => {
  const currentDate = useEverySecond();
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
          <dd className={clsx(styles.time, Classes.MONOSPACE_TEXT)}>
            {formatDurationTime(
              group.total +
                (group.lastStartedAt
                  ? currentDate.getTime() - group.lastStartedAt.getTime()
                  : 0),
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
};
