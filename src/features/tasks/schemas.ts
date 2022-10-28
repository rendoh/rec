import { z } from 'zod';

const taskTitleSchema = z.string().max(256);
export const dateSchema = z.preprocess((arg) => {
  if (typeof arg == 'string' || arg instanceof Date) return new Date(arg);
}, z.date());

export const taskSchema = z.object({
  id: z.number().nonnegative(),
  title: taskTitleSchema,
  started_at: dateSchema,
  ended_at: dateSchema.nullable(),
});
export type Task = z.infer<typeof taskSchema>;

// TODO: validate datetime for min-max range
export const findTasksDtoSchema = z.object({
  from: dateSchema.nullish(),
  to: dateSchema.nullish(),
});
export type FindTaskDto = z.infer<typeof findTasksDtoSchema>;

export const createTaskDtoSchema = z.object({
  title: taskTitleSchema,
  started_at: dateSchema,
});
export type CreateTaskDto = z.infer<typeof createTaskDtoSchema>;

// TODO: validate datetime for min-max range
export const updateTaskDtoSchema = z.object({
  title: taskTitleSchema.nullish(),
  started_at: dateSchema.nullish(),
  ended_at: dateSchema.nullish(),
});
export type UpdateTaskDto = z.infer<typeof updateTaskDtoSchema>;
