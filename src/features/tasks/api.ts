import { z } from 'zod';
import { invoke } from '@tauri-apps/api/tauri';
import {
  CreateTaskDto,
  createTaskDtoSchema,
  dateSchema,
  FindTaskDto,
  findTasksDtoSchema,
  taskSchema,
  UpdateTaskDto,
  updateTaskDtoSchema,
} from './schemas';

const dateToIsoString = dateSchema.transform((date) => date.toISOString());

export const taskDtoSchema = taskSchema.extend({
  started_at: dateToIsoString,
  ended_at: dateToIsoString.nullable(),
});
type TaskDto = z.infer<typeof taskDtoSchema>;

const findTaskDtoSerializer = findTasksDtoSchema.extend({
  from: dateToIsoString.nullish(),
  to: dateToIsoString.nullish(),
});

export async function findTasks(payload: FindTaskDto) {
  const taskDtos = await invoke<TaskDto[]>('find_all', {
    payload: findTaskDtoSerializer.parse(payload),
  });
  return taskDtos.map((taskDto) => taskSchema.parse(taskDto));
}

const createTaskDtoSerializer = createTaskDtoSchema.extend({
  started_at: dateToIsoString,
});

export async function createTask(payload: CreateTaskDto) {
  return invoke<TaskDto>('create', {
    payload: createTaskDtoSerializer.parse(payload),
  });
}

const updateTaskDtoSerializer = updateTaskDtoSchema.extend({
  started_at: dateToIsoString.nullish(),
  ended_at: dateToIsoString.nullish(),
});

export async function updateTask(id: number, payload: UpdateTaskDto) {
  return invoke<TaskDto>('update', {
    id,
    payload: updateTaskDtoSerializer.parse(payload),
  });
}

export async function deleteTask(id: number) {
  return invoke<null>('delete', {
    id,
  });
}