import { FC, useCallback } from 'react';
import { BsPlayFill } from 'react-icons/bs';
import { Button } from '../../../../components/Button';
import * as styles from './StartTaskButton.css';

export type StartTaskButtonProps = {
  title: string;
  onStart: (title: string) => void;
};

// TODO: remove this
export const StartTaskButton: FC<StartTaskButtonProps> = ({
  title,
  onStart,
}) => {
  const handleClick = useCallback(() => onStart(title), [onStart, title]);
  return (
    <Button
      border
      className={styles.root}
      onClick={handleClick}
      leftIcon={<BsPlayFill />}
    >
      {title}
    </Button>
  );
};
