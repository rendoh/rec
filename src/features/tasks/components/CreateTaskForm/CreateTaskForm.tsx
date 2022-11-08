import { FC, useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  CreateTaskDto,
  createTaskDtoSchema,
  maxTitleLength,
} from '../../schemas';
import { createTask } from '../../api';
import * as styles from './CreateTaskForm.css';
import { handleErrorMessages } from '../../../../components/ErrorToaster';
import { BsPlay } from 'react-icons/bs';
import { useFetchTasks } from '../../state/tasks';

const createTaskFormSchema = createTaskDtoSchema.omit({ started_at: true });
type CreateTaskFormValues = z.infer<typeof createTaskFormSchema>;

export const CreateTaskForm: FC = () => {
  const { register, handleSubmit, reset } = useForm<CreateTaskFormValues>({
    resolver: zodResolver(createTaskFormSchema),
  });
  const fetchTasks = useFetchTasks();

  const handleCreateTask = useCallback(
    async (title: string) => {
      const createTaskDto: CreateTaskDto = {
        title: title,
        started_at: new Date(),
      };
      try {
        await createTask(createTaskDto);
        reset();
        fetchTasks();
      } catch (error: unknown) {
        handleErrorMessages(error);
      }
    },
    [fetchTasks, reset],
  );

  const onSubmit: SubmitHandler<CreateTaskFormValues> = useCallback(
    async (values) => {
      handleCreateTask(values.title);
    },
    [handleCreateTask],
  );

  return (
    <form className={styles.root} onSubmit={handleSubmit(onSubmit)}>
      <input
        className={styles.input}
        type="text"
        {...register('title')}
        placeholder="タスク・プロジェクト名"
        maxLength={maxTitleLength}
      />
      <button className={styles.button} type="submit" aria-label="開始">
        <BsPlay />
      </button>
    </form>
  );
};
