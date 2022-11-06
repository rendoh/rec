import { forwardRef } from 'react';
import { maxTitleLength } from '../../schemas';
import * as styles from './TaskTitleField.css';
import clsx from 'clsx';

export type TaskTitleFieldProps = JSX.IntrinsicElements['input'] &
  styles.RootVariants;

export const TaskTitleField = forwardRef<HTMLInputElement, TaskTitleFieldProps>(
  ({ className, error, interactiveOutline, ...props }, ref) => (
    <input
      {...props}
      ref={ref}
      className={clsx(styles.root({ error, interactiveOutline }), className)}
      maxLength={maxTitleLength}
    />
  ),
);

TaskTitleField.displayName = 'TaskTitleField';
