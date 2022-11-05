import clsx from 'clsx';
import { FC } from 'react';
import * as styles from './Button.css';

export type ButtonProps = JSX.IntrinsicElements['button'] & styles.RootVariants;

export const Button: FC<ButtonProps> = ({
  type = 'button',
  border,
  className,
  children,
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
    {children}
  </button>
);
