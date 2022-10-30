import { z } from 'zod';
import { invoke } from '@tauri-apps/api/tauri';
import {
  CreateTaskDto,
  createTaskDtoSchema,
  dateSchema,
  FindTaskDto,
  findTasksDtoSchema,
  taskSchema,
  taskTitleSchema,
  UpdateTaskDto,
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
  const createdTask = await invoke<TaskDto>('create', {
    payload: createTaskDtoSerializer.parse(payload),
  });
  return taskSchema.parse(createdTask);
}

const updateTaskDtoSerializer = z.object({
  title: taskTitleSchema.nullish(),
  started_at: dateToIsoString.nullish(),
  ended_at: dateToIsoString.nullish(),
});

export async function updateTask(id: number, payload: UpdateTaskDto) {
  const updatedTask = await invoke<TaskDto>('update', {
    id,
    payload: updateTaskDtoSerializer.parse(payload),
  });
  return taskSchema.parse(updatedTask);
}

export async function deleteTask(id: number) {
  return invoke<null>('delete', {
    id,
  });
}

export async function findRecentTaskTitles() {
  return invoke<string[]>('find_recent_tasks');
}
