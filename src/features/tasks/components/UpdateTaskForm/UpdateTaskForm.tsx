import { FC, useCallback, useEffect, useState } from 'react';
import { FormGroup, InputGroup } from '@blueprintjs/core';
import { TimePicker, TimePrecision } from '@blueprintjs/datetime';
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
import { format } from 'date-fns';
import { updateTask } from '../../api';

export type UpdateTaskFormProps = {
  task: Task;
  onComplete?: () => void;
};

export const UpdateTaskForm: FC<UpdateTaskFormProps> = ({
  task,
  onComplete,
}) => {
  const { control, register, handleSubmit, formState, reset } =
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

  // TODO: use this with updated_at
  useEffect(() => {
    reset(task);
  }, [reset, task]);

  return (
    <form
      style={{
        margin: 10,
        border: '1px solid black',
      }}
    >
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
        />
      </FormGroup>
      {/* TODO: elapsed time */}
      {/* <p>started at: {format(task.started_at, 'HH:mm')}</p> */}
      {/* <p>ended at: {task.ended_at ? format(task.ended_at, 'HH:mm') : '-'}</p> */}
      <Controller
        name="started_at"
        control={control}
        render={({ field }) => (
          <TimePicker
            value={field.value}
            onChange={field.onChange}
            onBlur={handleSubmit(onSubmit)}
          />
        )}
      />
      <Controller
        name="ended_at"
        control={control}
        render={({ field }) =>
          task.ended_at ? (
            <TimePicker
              value={field.value}
              onChange={field.onChange}
              onBlur={handleSubmit(onSubmit)}
            />
          ) : (
            <IconButton
              icon="pause"
              onClick={() => {
                field.onChange(new Date());
                handleSubmit(onSubmit)();
              }}
            />
          )
        }
      />
    </form>
  );
};
