import { FC, PropsWithChildren } from 'react';
import * as styles from './GlassButtonGroup.css';

export const GlassButtonGroup: FC<PropsWithChildren> = ({ children }) => (
  <div className={styles.group}>{children}</div>
);
