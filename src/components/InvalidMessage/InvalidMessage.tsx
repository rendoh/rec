import clsx from 'clsx';
import { FC } from 'react';
import * as styles from './InvalidMessage.css';

export type InvalidMessageProps = JSX.IntrinsicElements['p'];

export const InvalidMessage: FC<InvalidMessageProps> = ({
  className,
  children,
  ...props
}) =>
  children ? (
    <p {...props} className={clsx(styles.root, className)}>
      {children}
    </p>
  ) : null;
