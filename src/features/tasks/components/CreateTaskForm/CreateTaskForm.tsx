import { FC, useCallback } from 'react';
import { Card, FormGroup } from '@blueprintjs/core';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CreateTaskDto, createTaskDtoSchema } from '../../schemas';
import { blueprintRegister as bpRegister } from '../../../../utils/blueprintRegister';
import { IconButton } from '../../../../components/IconButton';
import { createTask } from '../../api';
import * as styles from './CreateTaskForm.css';
import { TaskTitleField } from '../TaskTitleField';

const createTaskFormSchema = createTaskDtoSchema.omit({ started_at: true });
type CreateTaskFormValues = z.infer<typeof createTaskFormSchema>;

export type CreateTaskFormProps = {
  onComplete?: () => void;
};

export const CreateTaskForm: FC<CreateTaskFormProps> = ({ onComplete }) => {
  const { register, handleSubmit, formState, reset } =
    useForm<CreateTaskFormValues>({
      resolver: zodResolver(createTaskFormSchema),
    });

  const onSubmit: SubmitHandler<CreateTaskFormValues> = useCallback(
    async (values) => {
      const createTaskDto: CreateTaskDto = {
        ...values,
        started_at: new Date(),
      };
      // TODO: handle error
      await createTask(createTaskDto);
      reset();
      onComplete?.();
    },
    [onComplete, reset],
  );

  return (
    <Card elevation={2}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.row}>
          <FormGroup
            className={styles.formGroup}
            helperText={formState.errors.title?.message}
            intent={formState.errors.title && 'danger'}
          >
            <TaskTitleField
              placeholder="Project / Task"
              {...bpRegister(register('title'))}
              isError={!!formState.errors.title}
            />
          </FormGroup>
          <IconButton icon="play" type="submit" aria-label="Start" />
        </div>
        {/* TODO: suggest */}
      </form>
    </Card>
  );
};
