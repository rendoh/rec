import { FC } from 'react';
import { IconButton } from '../../../../components/IconButton';
import * as styles from './DailyTasksHeader.css';
import {
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
  BsChevronLeft,
  BsChevronRight,
} from 'react-icons/bs';
import { ja } from 'date-fns/locale';
import { format } from 'date-fns';
import { Button } from '../../../../components/Button';

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
    <div className={styles.today}>
      <Button border onClick={onTodayClick} disabled={disabledToday}>
        Today
      </Button>
    </div>
    <div className={styles.center}>
      <IconButton onClick={onPrevMonthClick}>
        <BsChevronDoubleLeft />
      </IconButton>
      <IconButton onClick={onPrevDateClick}>
        <BsChevronLeft />
      </IconButton>
      <p className={styles.date}>{formatDate(date)}</p>
      <IconButton onClick={onNextDateClick}>
        <BsChevronRight />
      </IconButton>
      <IconButton onClick={onNextMonthClick}>
        <BsChevronDoubleRight />
      </IconButton>
    </div>
  </div>
);

function formatDate(date: Date): string {
  return format(date, 'yyyy/MM/dd (iii)', {
    locale: ja,
  });
}
