import { Button, ButtonProps, Icon, IconProps } from '@blueprintjs/core';
import clsx from 'clsx';
import { FC } from 'react';
import * as styles from './IconButton.css';

export type IconButtonProps = Omit<ButtonProps, 'children'> & {
  icon: IconProps['icon'];
  iconProps?: Omit<IconProps, 'icon'>;
};

export const IconButton: FC<IconButtonProps> = ({
  className,
  iconProps,
  icon,
  ...props
}) => (
  <Button {...props} className={clsx(className, styles.root)}>
    <Icon icon={icon} {...iconProps} />
  </Button>
);
