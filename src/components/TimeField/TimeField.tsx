import { FC, KeyboardEvent, MouseEvent, useRef } from 'react';
import * as styles from './TimeField.css';
import clsx from 'clsx';
import { format, getHours, getMinutes, setHours, setMinutes } from 'date-fns';
import { wrap } from '../../utils/wrap';
import { useCallback, FocusEventHandler } from 'react';

export type TimeFieldProps = {
  className?: string;
  value: Date;
  onChange: (date: Date) => void;
  onBlur: FocusEventHandler;
} & styles.RootVariants;

export const TimeField: FC<TimeFieldProps> = ({
  className,
  value,
  error,
  onChange,
  onBlur,
}) => {
  const handleHoursKeyDown = useTimeFieldKeyboard({
    value,
    onChange,
    type: 'hours',
  });
  const handleMinutesKeyDown = useTimeFieldKeyboard({
    value,
    onChange,
    type: 'minutes',
  });
  const hoursDivRef = useRef<HTMLDivElement | null>(null);
  const rootDivRef = useRef<HTMLDivElement | null>(null);
  const onClickRoot = useCallback(
    (e: MouseEvent) =>
      e.target === rootDivRef.current && hoursDivRef.current?.focus(),
    [],
  );

  return (
    <div
      className={clsx(
        styles.root({
          error,
        }),
        className,
      )}
      ref={rootDivRef}
      onClick={onClickRoot}
    >
      <div
        className={styles.field}
        tabIndex={0}
        onKeyDown={handleHoursKeyDown}
        onBlur={onBlur}
        ref={hoursDivRef}
      >
        {format(value, 'HH')}
      </div>
      <div>:</div>
      <div
        className={styles.field}
        tabIndex={0}
        onKeyDown={handleMinutesKeyDown}
        onBlur={onBlur}
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
}: {
  value: Date;
  onChange: (date: Date) => void;
  type: 'hours' | 'minutes';
}) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (
        e.key !== 'Backspace' &&
        !e.key.match(/^[0-9]{1}$/) &&
        e.key !== 'ArrowUp' &&
        e.key !== 'ArrowDown'
      ) {
        return;
      }
      e.preventDefault();
      const isHours = type === 'hours';
      const setter = isHours ? setHours : setMinutes;
      const getter = isHours ? getHours : getMinutes;
      const max = isHours ? 24 : 60;

      if (e.key === 'Backspace') {
        onChange(setter(value, 0));
        return;
      }

      if (e.key.match(/^[0-9]{1}$/)) {
        const currentValue = getter(value);
        let newValue = Number(`${currentValue.toString().at(-1)}${e.key}`);
        if (newValue >= max) {
          newValue = Number(e.key);
        }
        onChange(setter(value, newValue));
        return;
      }

      const direction = e.key === 'ArrowUp' ? 1 : -1;
      onChange(setter(value, wrap(0, max, getter(value) + direction)));
    },
    [onChange, type, value],
  );

  return handleKeyDown;
}
