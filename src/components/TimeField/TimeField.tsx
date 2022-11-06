import { FC, KeyboardEvent, MouseEvent, useRef } from 'react';
import * as styles from './TimeField.css';
import clsx from 'clsx';
import {
  addHours,
  differenceInCalendarDays,
  format,
  getHours,
  getMinutes,
  setHours,
  setMinutes,
  subHours,
} from 'date-fns';
import { wrap } from '../../utils/wrap';
import { useCallback, FocusEventHandler } from 'react';

export type TimeFieldProps = {
  className?: string;
  value: Date;
  onChange: (date: Date) => void;
  onBlur?: FocusEventHandler;
  over24BaseDate?: Date;
} & styles.RootVariants;

export const TimeField: FC<TimeFieldProps> = ({
  className,
  value,
  error,
  onChange,
  onBlur,
  interactiveOutline,
  over24BaseDate,
}) => {
  const hoursDivRef = useRef<HTMLDivElement | null>(null);
  const minutesDivRef = useRef<HTMLDivElement | null>(null);
  const handleHoursKeyDown = useTimeFieldKeyboard({
    value,
    onChange,
    type: 'hours',
    siblingRef: minutesDivRef,
    over24BaseDate,
  });
  const handleMinutesKeyDown = useTimeFieldKeyboard({
    value,
    onChange,
    type: 'minutes',
    siblingRef: hoursDivRef,
  });
  const onClickRoot = useCallback(
    (e: MouseEvent) =>
      e.target !== minutesDivRef.current && hoursDivRef.current?.focus(),
    [],
  );

  const diffWithBaseDate =
    over24BaseDate && differenceInCalendarDays(value, over24BaseDate);

  return (
    <div
      className={clsx(
        styles.root({
          error,
          interactiveOutline,
        }),
        className,
      )}
      onClick={onClickRoot}
    >
      <div
        className={styles.field}
        tabIndex={0}
        onKeyDown={handleHoursKeyDown}
        onBlur={onBlur}
        ref={hoursDivRef}
        aria-label="時"
      >
        {diffWithBaseDate
          ? diffWithBaseDate * 24 + value.getHours()
          : format(value, 'HH')}
      </div>
      <div>:</div>
      <div
        className={styles.field}
        tabIndex={0}
        onKeyDown={handleMinutesKeyDown}
        onBlur={onBlur}
        ref={minutesDivRef}
        aria-label="分"
      >
        {format(value, 'mm')}
      </div>
    </div>
  );
};

function useTimeFieldKeyboard({
  value,
  onChange,
  type,
  siblingRef,
  over24BaseDate,
}: {
  value: Date;
  onChange: (date: Date) => void;
  type: 'hours' | 'minutes';
  siblingRef: React.MutableRefObject<HTMLDivElement | null>;
  over24BaseDate?: Date;
}) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (
        e.key !== 'Backspace' &&
        !e.key.match(/^[0-9]{1}$/) &&
        e.key !== 'ArrowUp' &&
        e.key !== 'ArrowDown' &&
        e.key !== 'ArrowRight' &&
        e.key !== 'ArrowLeft'
      ) {
        return;
      }
      e.preventDefault();
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        siblingRef.current?.focus();
        return;
      }

      const isHours = type === 'hours';
      const setter = isHours ? setHours : setMinutes;
      const getter = isHours ? getHours : getMinutes;

      if (e.key === 'Backspace') {
        if (over24BaseDate && isHours) {
          const hours =
            differenceInCalendarDays(value, over24BaseDate) * 24 +
            value.getHours();
          const sliced = Number(hours.toString().slice(0, -1)) || 0;
          const diff = hours - sliced;
          onChange(subHours(value, diff));
        } else {
          const currentValue = getter(value);
          const sliced = Number(currentValue.toString().slice(0, -1)) || 0;
          onChange(setter(value, sliced));
        }
        return;
      }

      const max = isHours ? 24 : 60;
      if (e.key.match(/^[0-9]{1}$/)) {
        if (over24BaseDate && isHours) {
          const hours =
            differenceInCalendarDays(value, over24BaseDate) * 24 +
            value.getHours();
          const concatted = Number(`${hours}${e.key}`);
          const diff = concatted - hours;
          onChange(addHours(value, diff));
        } else {
          const currentValue = getter(value);
          let newValue = Number(`${currentValue.toString().at(-1)}${e.key}`);
          if (newValue >= max) {
            newValue = Number(e.key);
          }
          onChange(setter(value, newValue));
        }
        return;
      }

      const direction = e.key === 'ArrowUp' ? 1 : -1;
      if (over24BaseDate && isHours) {
        const date = new Date(value);
        date.setHours(date.getHours() + direction);
        onChange(date);
      } else {
        onChange(setter(value, wrap(0, max, getter(value) + direction)));
      }
    },
    [onChange, over24BaseDate, siblingRef, type, value],
  );

  return handleKeyDown;
}
