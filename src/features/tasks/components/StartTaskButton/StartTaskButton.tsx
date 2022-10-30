import { Button } from '@blueprintjs/core';
import { FC, useCallback } from 'react';

export type StartTaskButtonProps = {
  title: string;
  onStart: (title: string) => void;
};

export const StartTaskButton: FC<StartTaskButtonProps> = ({
  title,
  onStart,
}) => {
  const handleClick = useCallback(() => onStart(title), [onStart, title]);
  return (
    <Button
      minimal
      outlined
      fill
      large
      onClick={handleClick}
      alignText="left"
      icon="play"
    >
      {title}
    </Button>
  );
};
