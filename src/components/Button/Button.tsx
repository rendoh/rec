import clsx from 'clsx';
import { FC, ReactNode } from 'react';
import * as styles from './Button.css';

export type ButtonProps = JSX.IntrinsicElements['button'] &
  styles.RootVariants & {
    leftIcon?: ReactNode;
  };

export const Button: FC<ButtonProps> = ({
  type = 'button',
  border,
  className,
  children,
  leftIcon,
  ...props
}) => (
  <button
    {...props}
    type={type}
    className={clsx(
      styles.root({
        border,
      }),
      className,
    )}
  >
    {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
    {children}
  </button>
);
