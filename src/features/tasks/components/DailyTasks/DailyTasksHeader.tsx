import { FC } from 'react';
import * as styles from './DailyTasksHeader.css';
import {
  BsCalculator,
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
  BsChevronLeft,
  BsChevronRight,
  BsListUl,
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
import { useSelectTab, useTabState } from '../../state/tabs';

export const DailyTasksHeader: FC = () => {
  const currentDate = useCurrentDate();
  const toPrevDay = useToPrevDay();
  const toNextDay = useToNextDay();
  const toPrevMonth = useToPrevMonth();
  const toNextMonth = useToNextMonth();
  const toToday = useToToday();
  const isToday = useIsCurrentDateToday();
  const tabState = useTabState();
  const selectTab = useSelectTab();

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
        <div className={styles.tabSelectors}>
          <button
            className={styles.tabSelector({ selected: tabState === 'list' })}
            type="button"
            onClick={() => selectTab('list')}
          >
            <BsListUl />
            一覧
          </button>
          <button
            className={styles.tabSelector({
              selected: tabState === 'aggregation',
            })}
            type="button"
            onClick={() => selectTab('aggregation')}
          >
            <BsCalculator />
            集計
          </button>
        </div>
      </div>
    </div>
  );
};

function formatDate(date: Date): string {
  return format(date, 'yyyy/MM/dd (iii)', {
    locale: ja,
  });
}
