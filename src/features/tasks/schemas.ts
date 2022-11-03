import { z } from 'zod';

export const maxTitleLength = 32;

export const taskTitleSchema = z
  .string()
  .min(1, {
    message: `タイトルは1文字以上${maxTitleLength}文字以下で入力してください`,
  })
  .max(maxTitleLength, {
    message: `タイトルは1文字以上${maxTitleLength}文字以下で入力してください`,
  });
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

export const updateTaskDtoSchema = z
  .object({
    title: taskTitleSchema,
    started_at: dateSchema,
    ended_at: dateSchema.nullish(),
  })
  .refine(({ started_at, ended_at }) => !ended_at || started_at < ended_at, {
    message: '日付の範囲が正しくありません',
    path: ['ended_at'],
  });
export type UpdateTaskDto = z.infer<typeof updateTaskDtoSchema>;
