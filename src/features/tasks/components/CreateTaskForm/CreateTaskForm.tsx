import { FC, useCallback, useEffect, useState } from 'react';
import { FormGroup, InputGroup } from '@blueprintjs/core';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  CreateTaskDto,
  createTaskDtoSchema,
  maxTitleLength,
} from '../../schemas';
import { blueprintRegister as bpRegister } from '../../../../utils/blueprintRegister';
import { IconButton } from '../../../../components/IconButton';
import { format } from 'date-fns';
import { createTask } from '../../api';

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

  const [currentDate, setCurrentDate] = useState(new Date());
  useEffect(() => {
    const intervalId = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup
        helperText={formState.errors.title?.message}
        intent={formState.errors.title && 'danger'}
      >
        <InputGroup
          {...bpRegister(register('title'))}
          intent={formState.errors.title && 'danger'}
          maxLength={maxTitleLength}
        />
      </FormGroup>
      {format(currentDate, 'HH:mm:ss')}
      <IconButton icon="play" type="submit" aria-label="Start" />
    </form>
  );
};
