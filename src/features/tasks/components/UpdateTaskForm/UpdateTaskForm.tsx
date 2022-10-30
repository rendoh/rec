import { FC, useCallback, useEffect, useState } from 'react';
import {
  Button,
  Card,
  Classes,
  ControlGroup,
  FormGroup,
  Icon,
} from '@blueprintjs/core';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Task, UpdateTaskDto, updateTaskDtoSchema } from '../../schemas';
import { blueprintRegister as bpRegister } from '../../../../utils/blueprintRegister';
import { IconButton } from '../../../../components/IconButton';
import { isFuture, isSameDay } from 'date-fns';
import { deleteTask, updateTask } from '../../api';
import * as styles from './UpdateTaskForm.css';
import { TimePicker } from '../../../../components/TimePicker';
import clsx from 'clsx';
import { TaskTitleField } from '../TaskTitleField';
import {
  Popover2 as Popover,
  Classes as PopoverClasses,
} from '@blueprintjs/popover2';
import { DayCounter } from '../../../../components/DayCounter';

function formatElapsedTime(start: Date, end: Date) {
  const duration = Math.floor((end.getTime() - start.getTime()) / 1000);
  const hours = Math.floor(duration / 3600)
    .toString()
    .padStart(2, '0');
  const minutes = Math.floor((duration / 60) % 60)
    .toString()
    .padStart(2, '0');
  const seconds = (duration % 60).toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}
export type UpdateTaskFormProps = {
  task: Task;
  onComplete?: () => void;
};

export const UpdateTaskForm: FC<UpdateTaskFormProps> = ({
  task,
  onComplete,
}) => {
  // TODO: refactor hooks
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
  const startedAtValue = getValues('started_at');
  const endedAtValue = getValues('ended_at');
  const isActive = !endedAtValue;
  const [currentDate, setCurrentDate] = useState(() => new Date());
  useEffect(() => {
    if (!isActive) return;
    const intervalId = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => clearInterval(intervalId);
  }, [isActive]);
  const elapsedTime = formatElapsedTime(
    startedAtValue,
    endedAtValue || currentDate,
  );

  const isInSameDay = endedAtValue && isSameDay(startedAtValue, endedAtValue);
  const [isDayCounterOpen, setIsDayCounterOpen] = useState(false);
  const toggleDayCounter = useCallback(
    () => setIsDayCounterOpen((v) => !v),
    [],
  );

  return (
    <Card elevation={2}>
      <div className={styles.headerRow}>
        <FormGroup
          className={styles.formGroup}
          helperText={formState.errors.title?.message}
          intent={formState.errors.title && 'danger'}
        >
          <TaskTitleField
            interactiveOutline
            {...bpRegister(
              register('title', {
                onBlur: handleSubmit(onSubmit),
              }),
            )}
            isError={!!formState.errors.title}
            onKeyUp={handleKeyUpEnter}
          />
        </FormGroup>
        <div className={styles.actions}>
          {isActive && (
            <Controller
              name="ended_at"
              control={control}
              render={({ field }) => (
                <IconButton
                  aria-label="Stop"
                  icon="pause"
                  disabled={!startedAtValue || isFuture(startedAtValue)}
                  onClick={(e) => {
                    field.onChange(new Date());
                    handleSubmit(onSubmit)(e);
                  }}
                />
              )}
            />
          )}
          <Popover
            placement="bottom-end"
            content={
              <div>
                <Button
                  intent="none"
                  className={PopoverClasses.POPOVER2_DISMISS}
                >
                  Cancel
                </Button>
                <Button intent="danger" onClick={remove}>
                  Delete
                </Button>
              </div>
            }
            renderTarget={({ isOpen, ref, ...targetProps }) => (
              <IconButton
                {...targetProps}
                elementRef={ref}
                icon={isOpen ? 'cross' : 'trash'}
                aria-label="Delete this task"
              />
            )}
          />
        </div>
      </div>
      <div className={styles.detailRow}>
        <FormGroup
          helperText={formState.errors.ended_at?.message}
          intent={formState.errors.ended_at && 'danger'}
        >
          <ControlGroup className={styles.dateTimeControlGroup}>
            <Controller
              name="started_at"
              control={control}
              render={({ field }) => (
                <TimePicker
                  isInvalid={!!formState.errors.ended_at}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={handleSubmit(onSubmit)}
                />
              )}
            />
            <div className={styles.tilde}> - </div>
            {!isActive && (
              <>
                <Controller
                  name="ended_at"
                  control={control}
                  render={({ field }) => (
                    <TimePicker
                      isInvalid={!!formState.errors.ended_at}
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={handleSubmit(onSubmit)}
                    />
                  )}
                />
                {isInSameDay && (
                  <Button small onClick={toggleDayCounter}>
                    <Icon
                      icon={isDayCounterOpen ? 'chevron-left' : 'chevron-right'}
                    />
                  </Button>
                )}
                {(isDayCounterOpen || !isInSameDay) && (
                  <Controller
                    name="ended_at"
                    control={control}
                    render={({ field }) =>
                      field.value ? (
                        <DayCounter
                          baseDate={startedAtValue}
                          value={field.value}
                          onChange={(value) => {
                            field.onChange(value);
                            handleSubmit(onSubmit)();
                          }}
                        />
                      ) : (
                        <>Something is wrong</>
                      )
                    }
                  />
                )}
              </>
            )}
          </ControlGroup>
        </FormGroup>
        <p className={clsx(Classes.MONOSPACE_TEXT, styles.elapsedTime)}>
          {elapsedTime}
        </p>
      </div>
    </Card>
  );
};
