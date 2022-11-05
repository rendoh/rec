import clsx from 'clsx';
import { FC } from 'react';
import * as styles from './IconButton.css';

export type IconButtonProps = JSX.IntrinsicElements['button'];

export const IconButton: FC<IconButtonProps> = ({
  type = 'button',
  children,
  className,
  ...props
}) => (
  <button {...props} className={clsx(styles.root, className)} type={type}>
    {children}
  </button>
);
