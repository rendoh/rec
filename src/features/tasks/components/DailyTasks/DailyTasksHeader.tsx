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

type DailyTasksHeaderProps = {
  date: Date;
  onPrevMonthClick: () => void;
  onPrevDateClick: () => void;
  onNextDateClick: () => void;
  onNextMonthClick: () => void;
  onTodayClick: () => void;
  disabledToday?: boolean;
};

export const DailyTasksHeader: FC<DailyTasksHeaderProps> = ({
  date,
  onPrevMonthClick,
  onPrevDateClick,
  onNextDateClick,
  onNextMonthClick,
  onTodayClick,
  disabledToday,
}) => (
  <div className={styles.root}>
    <div className={styles.controller}>
      <button className={styles.button} onClick={onPrevMonthClick}>
        <BsChevronDoubleLeft />
      </button>
      <button className={styles.button} onClick={onPrevDateClick}>
        <BsChevronLeft />
      </button>
      <p className={styles.date}>{formatDate(date)}</p>
      <button className={styles.button} onClick={onNextDateClick}>
        <BsChevronRight />
      </button>
      <button className={styles.button} onClick={onNextMonthClick}>
        <BsChevronDoubleRight />
      </button>
    </div>
    <div className={styles.buttons}>
      <button
        className={styles.borderButton}
        type="button"
        onClick={onTodayClick}
        disabled={disabledToday}
      >
        Today
      </button>
    </div>
  </div>
);

function formatDate(date: Date): string {
  return format(date, 'yyyy/MM/dd (iii)', {
    locale: ja,
  });
}
