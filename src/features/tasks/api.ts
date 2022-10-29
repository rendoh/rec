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
  const createdTask = await invoke<TaskDto>('create', {
    payload: createTaskDtoSerializer.parse(payload),
  });
  return taskSchema.parse(createdTask);
}

const updateTaskDtoSerializer = updateTaskDtoSchema.extend({
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

// TODO: remove this
const tasks = [
  {
    title: 'Project A',
    started_at: new Date('2022-10-25T08:00:00.000+09:00'),
    ended_at: new Date('2022-10-25T10:00:00.000+09:00'),
  },
  {
    title: 'Project B',
    started_at: new Date('2022-10-25T10:00:00.000+09:00'),
    ended_at: new Date('2022-10-25T11:30:00.000+09:00'),
  },
  {
    title: 'Project A',
    started_at: new Date('2022-10-25T11:30:00.000+09:00'),
    ended_at: new Date('2022-10-25T12:00:00.000+09:00'),
  },
  {
    title: 'Project A',
    started_at: new Date('2022-10-25T13:00:00.000+09:00'),
    ended_at: new Date('2022-10-25T17:00:00.000+09:00'),
  },
  {
    title: 'Project B',
    started_at: new Date('2022-10-27T17:00:00.000+09:00'),
    ended_at: new Date('2022-10-27T19:00:00.000+09:00'),
  },
  {
    title: 'Project A',
    started_at: new Date('2022-10-27T22:00:00.000+09:00'),
    ended_at: new Date('2022-10-28T01:00:00.000+09:00'),
  },
  {
    title: 'Project A',
    started_at: new Date('2022-10-28T08:00:00.000+09:00'),
    ended_at: new Date('2022-10-28T12:00:00.000+09:00'),
  },
  {
    title: 'Project C',
    started_at: new Date('2022-10-28T13:00:00.000+09:00'),
    ended_at: new Date('2022-10-28T17:00:00.000+09:00'),
  },
  {
    title: 'Project B',
    started_at: new Date('2022-10-29T13:00:00.000+09:00'),
    ended_at: new Date('2022-10-29T14:30:00.000+09:00'),
  },
];

async function seed() {
  for (const task of tasks) {
    const createdTask = await createTask({
      title: task.title,
      started_at: task.started_at,
    });
    await updateTask(createdTask.id, {
      started_at: createdTask.started_at,
      ended_at: task.ended_at,
    });
  }
}
