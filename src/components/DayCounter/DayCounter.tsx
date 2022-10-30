import { Button, Classes } from '@blueprintjs/core';
import { addDays, differenceInCalendarDays, subDays } from 'date-fns';
import { FC, useCallback } from 'react';
import * as styles from './DayCounter.css';

function getTextByDifference(diff: number) {
  switch (diff) {
    case 0: {
      return 'Same day';
    }
    case 1: {
      return 'Next day';
    }
    case -1: {
      return 'Previous day';
    }
    default: {
      return `${Math.abs(diff)} days ${diff > 0 ? 'later' : 'ago'}`;
    }
  }
}

export type DayCounterProps = {
  value: Date;
  baseDate: Date;
  onChange: (value: Date) => void;
};
export const DayCounter: FC<DayCounterProps> = ({
  value,
  baseDate,
  onChange,
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
      <Button small onClick={sub}>
        -
      </Button>
      <span className={Classes.TEXT_SMALL}>{getTextByDifference(diff)}</span>
      <Button small onClick={add}>
        +
      </Button>
    </span>
  );
};
