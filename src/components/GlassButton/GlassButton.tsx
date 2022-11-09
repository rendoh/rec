import clsx from 'clsx';
import { FC } from 'react';
import * as styles from './GlassButton.css';

export type GlassButtonProps = JSX.IntrinsicElements['button'] &
  styles.GlassButtonVariants;

export const GlassButton: FC<GlassButtonProps> = ({
  size,
  selected,
  type = 'button',
  className,
  children,
  ...props
}) => (
  <button
    type={type}
    className={clsx(
      styles.glassButton({
        size,
        selected,
      }),
      className,
    )}
    {...props}
  >
    {children}
  </button>
);
