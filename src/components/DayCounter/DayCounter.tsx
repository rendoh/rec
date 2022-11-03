import { Button, Classes } from '@blueprintjs/core';
import { addDays, differenceInCalendarDays, subDays } from 'date-fns';
import { FC, useCallback } from 'react';
import * as styles from './DayCounter.css';

function getTextByDifference(diff: number) {
  switch (diff) {
    case 0: {
      return '同日';
    }
    case 1: {
      return '翌日';
    }
    case -1: {
      return '前日';
    }
    default: {
      return `${Math.abs(diff)}日${diff > 0 ? '後' : '前'}`;
    }
  }
}

export type DayCounterProps = {
  value: Date;
  baseDate: Date;
  onChange: (value: Date) => void;
  disablePastDateSelect?: boolean;
};
export const DayCounter: FC<DayCounterProps> = ({
  value,
  baseDate,
  onChange,
  disablePastDateSelect = false,
}) => {
  const add = useCallback(() => {
    onChange(addDays(value, 1));
  }, [onChange, value]);
  const sub = useCallback(() => {
    onChange(subDays(value, 1));
  }, [onChange, value]);
  const diff = differenceInCalendarDays(value, baseDate);

  return (
    <span className={styles.root}>
      <Button small onClick={sub} disabled={disablePastDateSelect && diff <= 0}>
        -
      </Button>
      <span className={Classes.TEXT_SMALL}>{getTextByDifference(diff)}</span>
      <Button small onClick={add}>
        +
      </Button>
    </span>
  );
};
