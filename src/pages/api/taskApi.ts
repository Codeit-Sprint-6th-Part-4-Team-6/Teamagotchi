import {
  DateTask,
  PatchTaskRequest,
  PostTaskRequest,
  Task,
  TaskDetails,
} from '@coworkers-types';

import { axiosInstance } from './axios';

/**
 * 할 일을 하나 생성하는 API 함수입니다.
 * @param groupId - 할 일 목록을 받아올 group의 ID입니다.
 * @param taskListId - 할 일 목록의 ID입니다.
 * @returns 생성된 task 객체를 반환합니다.
 */
export const postTask = async (
  groupId: number,
  taskListId: number,
  data: PostTaskRequest
): Promise<Task> => {
  const response = await axiosInstance.post<Task>(
    `groups/${groupId}/task-lists/${taskListId}/tasks`,
    data
  );
  return response.data;
};

/**
 * 특정 일자, 특정 할일 리스트의 할일 리스트를 조회하는 API 함수입니다.
 * @param groupId - 할 일 목록을 받아올 group의 ID입니다.
 * @param taskListId - 할 일 목록의 ID입니다.
 * @returns 특정 일자의 task 배열을 반환합니다.
 */
export const getDateTaskList = async (
  groupId: number,
  taskListId: number,
  date?: string
): Promise<DateTask[]> => {
  const params = new URLSearchParams(`date=${date}`);

  const response = await axiosInstance.get<DateTask[]>(
    `groups/${groupId}/task-lists/${taskListId}/tasks?${params}`
  );
  return response.data;
};

/**
 * 할 일 상세보기를 조회하는 API 함수입니다.
 * @param groupId - 할 일 목록을 받아올 group의 ID입니다.
 * @param taskListId - 할 일 목록의 ID입니다.
 * @param taskId - 할 일을 받아올 task의 ID입니다.
 * @returns task의 상세정보 객체를 반환합니다.
 */
export const getTaskDetails = async (
  groupId: number,
  taskListId: number,
  taskId: number
): Promise<TaskDetails> => {
  const response = await axiosInstance.get<TaskDetails>(
    `groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`
  );
  return response.data;
};

/**
 * 할 일 상세보기를 수정하는 API 함수입니다.
 * @param groupId - 할 일 목록을 받아올 group의 ID입니다.
 * @param taskListId - 할 일 목록의 ID입니다.
 * @param taskId - 할 일을 받아올 task의 ID입니다.
 * @returns 수정된 task 상세정보 객체를 반환합니다.
 */
export const patchTaskDetails = async (
  groupId: number,
  taskListId: number,
  taskId: number,
  data: PatchTaskRequest
): Promise<TaskDetails> => {
  const response = await axiosInstance.patch<TaskDetails>(
    `groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`,
    data
  );
  return response.data;
};

/**
 * 특정 할 일을 삭제하는 API 함수입니다.
 * @param groupId - 할 일 목록을 받아올 group의 ID입니다.
 * @param taskListId - 할 일 목록의 ID입니다.
 * @param taskId - 할 일을 받아올 task의 ID입니다.
 * @returns 완료 시 204 코드를 받고, 응답 본문은 없습니다.
 */
export const deleteTask = async (
  groupId: number,
  taskListId: number,
  taskId: number
): Promise<void> => {
  await axiosInstance.delete(
    `groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`
  );
};

/**
 * 반복되는 할 일을 삭제하는 API 함수입니다.
 * @param groupId - 할 일 목록을 받아올 group의 ID입니다.
 * @param taskListId - 할 일 목록의 ID입니다.
 * @param taskId - 할 일을 받아올 task의 ID입니다.
 * @param recurringId - 반복되는 task의 ID입니다.
 * @returns 완료 시 204 코드를 받고, 응답 본문은 없습니다.
 */
export const deleteRecurringTask = async (
  groupId: number,
  taskListId: number,
  taskId: number,
  recurringId: number
): Promise<void> => {
  await axiosInstance.delete(
    `groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}/recurring/${recurringId}`
  );
};
