import { FC } from 'react';
import { useEverySecond } from '../../../../hooks/useEverySecond';
import { formatDurationTime } from '../../../../utils/formatDurationTime';

export type ElapsedTimeProps = { duration: number; start?: Date };

export const ElapsedTime: FC<ElapsedTimeProps> = ({ duration, start }) => {
  const now = useEverySecond(!start);

  return (
    <span>
      {formatDurationTime(
        duration + (start ? now.getTime() - start.getTime() : 0),
      )}
    </span>
  );
};
