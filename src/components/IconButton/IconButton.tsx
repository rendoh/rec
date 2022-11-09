import clsx from 'clsx';
import { FC } from 'react';
import * as styles from './IconButton.css';

export type IconButtonProps = JSX.IntrinsicElements['button'] &
  styles.RootVariants;

export const IconButton: FC<IconButtonProps> = ({
  type = 'button',
  border,
  color,
  children,
  className,
  ...props
}) => (
  <button
    {...props}
    className={clsx(
      styles.root({
        border,
        color,
      }),
      className,
    )}
    type={type}
  >
    {children}
  </button>
);
