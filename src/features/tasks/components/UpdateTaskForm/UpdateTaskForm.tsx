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
import { formatDurationTime } from '../../../../utils/formatDurationTime';
import { useEverySecond } from '../../../../hooks/useEverySecond';
import { handleErrorMessages } from '../../../../components/ErrorToaster';
import { InvalidMessage } from '../../../../components/InvalidMessage';
import { BsPauseFill, BsTrashFill, BsXLg } from 'react-icons/bs';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '../../../../components/Button';
import { useOverlayState } from '../../../../hooks/useOverlayState';

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
      try {
        await updateTask(task.id, {
          ...values,
        });
        onComplete?.();
      } catch (error: unknown) {
        handleErrorMessages(error);
      }
    },
    [onComplete, task.id],
  );

  useEffect(() => {
    reset(task);
  }, [reset, task]);

  const remove = useCallback(async () => {
    try {
      await deleteTask(task.id);
      onComplete?.();
    } catch (error: unknown) {
      handleErrorMessages(error);
    }
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
  const currentDate = useEverySecond(!isActive);

  const elapsedTime = formatDurationTime(
    (endedAtValue || currentDate).getTime() - startedAtValue.getTime(),
  );

  const ref = useRef<HTMLDivElement | null>(null);
  const { isOpen: isDeletePopoverOpen, toggle: toggleDeletePopover } =
    useOverlayState(ref);

  return (
    <div className={styles.root}>
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
                  <BsPauseFill />
                </IconButton>
              )}
            />
          )}
          <div className={styles.deletePopoverContainer}>
            <IconButton aria-label="削除" border onClick={toggleDeletePopover}>
              {isDeletePopoverOpen ? <BsXLg /> : <BsTrashFill />}
            </IconButton>
            <AnimatePresence>
              {isDeletePopoverOpen && (
                <motion.div
                  ref={ref}
                  className={styles.deletePopover}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  <Button onClick={remove} color="error">
                    削除
                  </Button>
                  <Button onClick={toggleDeletePopover}>戻る</Button>
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
        <p className={styles.elapsedTime}>{elapsedTime}</p>
      </div>
    </div>
  );
};
