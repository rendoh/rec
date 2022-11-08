import { FC, useMemo } from 'react';
import { Task } from '../../schemas';
import { ElapsedTime } from '../ElapsedTime';
import * as styles from './TaskAggregation.css';
import { useCurrentDate } from '../../state/currentDate';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

export type TaskAggregationProps = {
  tasks: Task[];
};

type TaskGroup = {
  title: string;
  total: number;
  lastStartedAt?: Date;
};

export const TaskAggregation: FC<TaskAggregationProps> = ({ tasks }) => {
  const currentDate = useCurrentDate();

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
    <div className={styles.root}>
      <h1 className={styles.heading}>
        {formatDate(currentDate)} のタスク集計結果
      </h1>
      <dl>
        {grouped.map((group) => (
          <div key={group.title} className={styles.row}>
            <dt className={styles.title}>{group.title}</dt>
            <dd
              className={styles.time({
                active: !!group.lastStartedAt,
              })}
            >
              <ElapsedTime duration={group.total} start={group.lastStartedAt} />
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

function formatDate(date: Date): string {
  return format(date, 'yyyy/MM/dd', {
    locale: ja,
  });
}
