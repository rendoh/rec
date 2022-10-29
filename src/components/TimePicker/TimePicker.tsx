import { FC } from 'react';
import {
  TimePicker as BPTimePicker,
  TimePickerProps as BPTimePickerProps,
} from '@blueprintjs/datetime';
import * as styles from './TimePicker.css';
import { Classes } from '@blueprintjs/core';
import clsx from 'clsx';

export type TimePickerProps = BPTimePickerProps & {
  isInvalid?: boolean;
};

export const TimePicker: FC<TimePickerProps> = ({
  isInvalid,
  className,
  ...props
}) => (
  <BPTimePicker
    className={clsx(className, styles.root, Classes.MONOSPACE_TEXT, {
      [styles.invalid]: isInvalid,
    })}
    {...props}
  />
);
