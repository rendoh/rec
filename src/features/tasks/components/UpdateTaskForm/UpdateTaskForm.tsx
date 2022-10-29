import { FC, useCallback, useEffect, useState } from 'react';
import { Card, ControlGroup, FormGroup, InputGroup } from '@blueprintjs/core';
import { TimePicker } from '@blueprintjs/datetime';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  maxTitleLength,
  Task,
  UpdateTaskDto,
  updateTaskDtoSchema,
} from '../../schemas';
import { blueprintRegister as bpRegister } from '../../../../utils/blueprintRegister';
import { IconButton } from '../../../../components/IconButton';
import { isFuture } from 'date-fns';
import { deleteTask, updateTask } from '../../api';
import * as styles from './UpdateTaskForm.css';
import clsx from 'clsx';

function formatElapsedTime(start: Date, end: Date, includeSeconds = false) {
  const duration = Math.floor((end.getTime() - start.getTime()) / 1000);
  const hours = Math.floor(duration / 3600)
    .toString()
    .padStart(2, '0');
  const minutes = Math.floor((duration / 60) % 60)
    .toString()
    .padStart(2, '0');
  const seconds = includeSeconds
    ? ':' + (duration % 60).toString().padStart(2, '0')
    : '';
  return `${hours}:${minutes}${seconds}`;
}
export type UpdateTaskFormProps = {
  task: Task;
  onComplete?: () => void;
};

export const UpdateTaskForm: FC<UpdateTaskFormProps> = ({
  task,
  onComplete,
}) => {
  const { control, register, handleSubmit, formState, reset, getValues } =
    useForm<UpdateTaskDto>({
      defaultValues: task,
      resolver: zodResolver(updateTaskDtoSchema),
    });

  const onSubmit: SubmitHandler<UpdateTaskDto> = useCallback(
    async (values) => {
      // TODO: handle error
      await updateTask(task.id, {
        ...values,
      });
      onComplete?.();
    },
    [onComplete, task.id],
  );

  useEffect(() => {
    reset(task);
  }, [reset, task]);

  // TODO: handle error
  const remove = useCallback(async () => {
    await deleteTask(task.id);
    onComplete?.();
  }, [onComplete, task.id]);

  const handleKeyUpEnter = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== 'Enter') return;
      e.currentTarget.blur();
    },
    [],
  );
  const isActive = !task.ended_at;
  const startedAtValue = getValues('started_at');
  const endedAtValue = getValues('ended_at');
  const [currentDate, setCurrentDate] = useState(() => new Date());
  useEffect(() => {
    const intervalId = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => clearInterval(intervalId);
  }, []);
  const elapsedTime = formatElapsedTime(
    startedAtValue,
    endedAtValue || currentDate,
    isActive,
  );

  return (
    <Card>
      {/* TODO: open modal before delete */}
      <IconButton icon="trash" onClick={remove} aria-label="Delete this task" />
      <FormGroup
        helperText={formState.errors.title?.message}
        intent={formState.errors.title && 'danger'}
      >
        <InputGroup
          {...bpRegister(
            register('title', {
              onBlur: handleSubmit(onSubmit),
            }),
          )}
          intent={formState.errors.title && 'danger'}
          maxLength={maxTitleLength}
          onKeyUp={handleKeyUpEnter}
        />
      </FormGroup>
      <p>{elapsedTime}</p>
      <FormGroup
        helperText={formState.errors.ended_at?.message}
        intent={formState.errors.ended_at && 'danger'}
      >
        <ControlGroup>
          <Controller
            name="started_at"
            control={control}
            render={({ field }) => (
              <TimePicker
                className={clsx({
                  [styles.invalidTimePicker]: formState.errors.ended_at,
                })}
                value={field.value}
                onChange={field.onChange}
                onBlur={handleSubmit(onSubmit)}
                maxTime={endedAtValue ?? undefined}
              />
            )}
          />
          <div className={styles.tilde}> - </div>
          {/* TODO: 日をまたぐケースに対応 */}
          <Controller
            name="ended_at"
            control={control}
            render={({ field }) =>
              isActive ? (
                <IconButton
                  aria-label="Stop"
                  icon="pause"
                  disabled={!startedAtValue || isFuture(startedAtValue)}
                  onClick={(e) => {
                    field.onChange(new Date());
                    handleSubmit(onSubmit)(e);
                  }}
                />
              ) : (
                <TimePicker
                  className={clsx({
                    [styles.invalidTimePicker]: formState.errors.ended_at,
                  })}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={handleSubmit(onSubmit)}
                  minTime={startedAtValue}
                />
              )
            }
          />
        </ControlGroup>
      </FormGroup>
    </Card>
  );
};
