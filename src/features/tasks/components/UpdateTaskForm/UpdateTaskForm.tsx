import { FC, useCallback, useEffect, useRef } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Task, UpdateTaskDto, updateTaskDtoSchema } from '../../schemas';
import { IconButton } from '../../../../components/IconButton';
import { isFuture } from 'date-fns';
import { deleteTask, updateTask } from '../../api';
import * as styles from './UpdateTaskForm.css';
import { TimeField } from '../../../../components/TimeField';
import { TaskTitleField } from '../TaskTitleField';
import { handleErrorMessages } from '../../../../components/ErrorToaster';
import { InvalidMessage } from '../../../../components/InvalidMessage';
import { BsPause, BsTrash, BsX } from 'react-icons/bs';
import { AnimatePresence, motion } from 'framer-motion';
import { useOverlayState } from '../../../../hooks/useOverlayState';
import { useFetchTasks } from '../../state/tasks';
import { ElapsedTime } from '../ElapsedTime';
import { useIsFirstRender } from '../../../../hooks/useIsFirstRender';

export type UpdateTaskFormProps = {
  task: Task;
};

export const UpdateTaskForm: FC<UpdateTaskFormProps> = ({ task }) => {
  const { control, register, handleSubmit, formState, reset, getValues } =
    useForm<UpdateTaskDto>({
      defaultValues: task,
      resolver: zodResolver(updateTaskDtoSchema),
    });

  const fetchTasks = useFetchTasks();
  const onSubmit: SubmitHandler<UpdateTaskDto> = useCallback(
    async (values) => {
      try {
        await updateTask(task.id, {
          ...values,
        });
        fetchTasks();
      } catch (error: unknown) {
        handleErrorMessages(error);
      }
    },
    [fetchTasks, task.id],
  );

  const isFirstRender = useIsFirstRender();
  useEffect(() => {
    if (!isFirstRender) {
      reset(task);
    }
    // isFirstRenderがtrue→falseに変更されたときにresetが実行されるのを防ぐためにdepsに含めない
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset, task]);

  const remove = useCallback(async () => {
    try {
      await deleteTask(task.id);
      fetchTasks();
    } catch (error: unknown) {
      handleErrorMessages(error);
    }
  }, [fetchTasks, task.id]);

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

  const ref = useRef<HTMLDivElement | null>(null);
  const { isOpen: isDeletePopoverOpen, toggle: toggleDeletePopover } =
    useOverlayState(ref);

  return (
    <div
      className={styles.root({
        active: isActive,
        grayout: isDeletePopoverOpen,
      })}
    >
      <div className={styles.headerRow}>
        <div className={styles.titleField}>
          <TaskTitleField
            {...register('title', {
              onBlur: handleSubmit(onSubmit),
            })}
            interactiveOutline
            onKeyUp={handleKeyUpEnter}
            error={!!formState.errors.title}
          />
          <InvalidMessage>{formState.errors.title?.message}</InvalidMessage>
        </div>
        <div className={styles.actions}>
          {isActive && (
            <Controller
              name="ended_at"
              control={control}
              render={({ field }) => (
                <IconButton
                  aria-label="停止"
                  disabled={!startedAtValue || isFuture(startedAtValue)}
                  onClick={(e) => {
                    field.onChange(new Date());
                    handleSubmit(onSubmit)(e);
                  }}
                  border
                >
                  <BsPause />
                </IconButton>
              )}
            />
          )}
          <div className={styles.deletePopoverContainer}>
            <IconButton aria-label="削除" border onClick={toggleDeletePopover}>
              {isDeletePopoverOpen ? <BsX /> : <BsTrash />}
            </IconButton>
            <AnimatePresence>
              {isDeletePopoverOpen && (
                <motion.div
                  ref={ref}
                  className={styles.deletePopover}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <button
                    className={styles.smallButton({ primary: true })}
                    type="button"
                    onClick={remove}
                  >
                    削除
                  </button>
                  <button
                    className={styles.smallButton()}
                    type="button"
                    onClick={toggleDeletePopover}
                  >
                    戻る
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div className={styles.detailRow}>
        <div>
          <div className={styles.range}>
            <Controller
              name="started_at"
              control={control}
              render={({ field }) => (
                <TimeField
                  error={!!formState.errors.ended_at}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={handleSubmit(onSubmit)}
                  interactiveOutline
                />
              )}
            />
            <div> - </div>
            {!isActive && (
              <Controller
                name="ended_at"
                control={control}
                render={({ field }) =>
                  field.value ? (
                    <TimeField
                      error={!!formState.errors.ended_at}
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={handleSubmit(onSubmit)}
                      interactiveOutline
                      over24BaseDate={startedAtValue}
                    />
                  ) : (
                    <InvalidMessage>Something wrong</InvalidMessage>
                  )
                }
              />
            )}
          </div>
          <InvalidMessage>{formState.errors.ended_at?.message}</InvalidMessage>
        </div>
        <p className={styles.elapsedTime({ active: isActive })}>
          <ElapsedTime
            duration={
              endedAtValue
                ? endedAtValue.getTime() - startedAtValue.getTime()
                : 0
            }
            start={endedAtValue ? undefined : startedAtValue}
          />
        </p>
      </div>
    </div>
  );
};
