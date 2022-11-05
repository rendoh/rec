import { FC, useCallback } from 'react';
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
import { handleErrorMessages } from '../../../../components/ErrorToaster';
import { InvalidMessage } from '../../../../components/InvalidMessage';
import { BsPlayFill } from 'react-icons/bs';

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
      try {
        await createTask(createTaskDto);
        reset();
        onComplete?.();
      } catch (error: unknown) {
        handleErrorMessages(error);
      }
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
    <div className={styles.root}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.row}>
          <div className={styles.fieldGroup}>
            <TaskTitleField
              {...register('title')}
              placeholder="タスク・プロジェクト名"
              error={!!formState.errors.title}
            />
            <InvalidMessage>{formState.errors.title?.message}</InvalidMessage>
          </div>
          <IconButton
            border
            className={styles.startButton}
            type="submit"
            aria-label="開始"
          >
            <BsPlayFill />
          </IconButton>
        </div>
        {recentTaskTitles.length > 0 && (
          <>
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
    </div>
  );
};
