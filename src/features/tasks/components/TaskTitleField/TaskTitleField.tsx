import { forwardRef } from 'react';
import { maxTitleLength } from '../../schemas';
import * as styles from './TaskTitleField.css';
import clsx from 'clsx';

export type TaskTitleFieldProps = JSX.IntrinsicElements['input'] &
  styles.RootVariants & {
    interactiveOutline?: boolean;
  };

export const TaskTitleField = forwardRef<HTMLInputElement, TaskTitleFieldProps>(
  ({ className, error, ...props }, ref) => (
    <input
      {...props}
      ref={ref}
      className={clsx(styles.root({ error }), className)}
      maxLength={maxTitleLength}
    />
  ),
);

TaskTitleField.displayName = 'TaskTitleField';
