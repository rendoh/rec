import { FC } from 'react';
import * as styles from './DailyTasksHeader.css';
import {
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
  BsChevronLeft,
  BsChevronRight,
} from 'react-icons/bs';
import { ja } from 'date-fns/locale';
import { format } from 'date-fns';
import {
  useCurrentDate,
  useIsCurrentDateToday,
  useToNextDay,
  useToNextMonth,
  useToPrevDay,
  useToPrevMonth,
  useToToday,
} from '../../state/currentDate';

export const DailyTasksHeader: FC = () => {
  const currentDate = useCurrentDate();
  const toPrevDay = useToPrevDay();
  const toNextDay = useToNextDay();
  const toPrevMonth = useToPrevMonth();
  const toNextMonth = useToNextMonth();
  const toToday = useToToday();
  const isToday = useIsCurrentDateToday();

  return (
    <div className={styles.root}>
      <div className={styles.controller}>
        <button
          className={styles.button}
          onClick={toPrevMonth}
          aria-label="前の月へ"
        >
          <BsChevronDoubleLeft />
        </button>
        <button
          className={styles.button}
          onClick={toPrevDay}
          aria-label="前日へ"
        >
          <BsChevronLeft />
        </button>
        <p className={styles.date}>{formatDate(currentDate)}</p>
        <button
          className={styles.button}
          onClick={toNextDay}
          aria-label="翌日へ"
        >
          <BsChevronRight />
        </button>
        <button
          className={styles.button}
          onClick={toNextMonth}
          aria-label="次の月へ"
        >
          <BsChevronDoubleRight />
        </button>
      </div>
      <div className={styles.buttons}>
        <button
          className={styles.borderButton}
          type="button"
          onClick={toToday}
          disabled={isToday}
        >
          今日
        </button>
      </div>
    </div>
  );
};

function formatDate(date: Date): string {
  return format(date, 'yyyy/MM/dd (iii)', {
    locale: ja,
  });
}
