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
import { StartTaskButton } from '../StartTaskButton';

const createTaskFormSchema = createTaskDtoSchema.omit({ started_at: true });
type CreateTaskFormValues = z.infer<typeof createTaskFormSchema>;

export type CreateTaskFormProps = {
  recentTaskTitles: string[];
  onComplete?: () => void;
};

export const CreateTaskForm: FC<CreateTaskFormProps> = ({
  recentTaskTitles,
  onComplete,
}) => {
  const { register, handleSubmit, formState, reset } =
    useForm<CreateTaskFormValues>({
      resolver: zodResolver(createTaskFormSchema),
    });

  const handleCreateTask = useCallback(
    async (title: string) => {
      const createTaskDto: CreateTaskDto = {
        title: title,
        started_at: new Date(),
      };
      // TODO: handle error
      await createTask(createTaskDto);
      reset();
      onComplete?.();
    },
    [onComplete, reset],
  );

  const onSubmit: SubmitHandler<CreateTaskFormValues> = useCallback(
    async (values) => {
      handleCreateTask(values.title);
    },
    [handleCreateTask],
  );

  return (
    <Card elevation={1}>
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
        {recentTaskTitles.length > 0 && (
          <>
            <p className={styles.recentTasksTitle}>Recent tasks</p>
            <div className={styles.startButtons}>
              {recentTaskTitles.map((title, i) => (
                <StartTaskButton
                  key={i}
                  title={title}
                  onStart={handleCreateTask}
                />
              ))}
            </div>
          </>
        )}
      </form>
    </Card>
  );
};
