import { FC } from 'react';
import { InputGroup, InputGroupProps2 } from '@blueprintjs/core';
import { maxTitleLength } from '../../schemas';
import * as styles from './TaskTitleField.css';
import clsx from 'clsx';

export type TaskTitleFieldProps = Omit<
  InputGroupProps2,
  'large' | 'maxLength'
> & {
  interactiveOutline?: boolean;
  isError?: boolean;
};

export const TaskTitleField: FC<TaskTitleFieldProps> = ({
  className,
  isError,
  interactiveOutline,
  ...props
}) => (
  <InputGroup
    className={clsx(styles.root, className, {
      [styles.interactiveOutline]: interactiveOutline,
    })}
    large
    intent={isError ? 'danger' : undefined}
    maxLength={maxTitleLength}
    {...props}
  />
);
