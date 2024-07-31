import { TaskList, TaskListResponse } from '@coworkers-types';

import { axiosInstance } from './axios';

/**
 * 할 일 목록을 조회하는 API 함수입니다.
 * @param groupId - 할 일 목록을 받아올 group의 ID입니다.
 * @param taskListId - 할 일 목록의 ID입니다.
 * @returns 그룹정보와 할 일 목록이 담긴 객체를 반환합니다.
 */
export const getTaskList = async (
  groupId: number,
  taskListId: number,
  date?: string
): Promise<TaskList> => {
  const params = new URLSearchParams(`date=${date}`);

  const response = await axiosInstance.get<TaskList>(
    `groups/${groupId}/task-lists/${taskListId}?${params}`
  );
  return response.data;
};

/**
 * 할 일 목록을 수정하는 API 함수입니다.
 * @param groupId - 할 일 목록을 받아올 group의 ID입니다.
 * @param taskListId - 할 일 목록의 ID입니다.
 * @param name - 할 일 목록 이름
 * @returns 그룹정보와 할 일 목록이 담긴 객체를 반환합니다.
 */
export const patchTaskList = async (
  groupId: number,
  taskListId: number,
  name: string
): Promise<TaskListResponse> => {
  const response = await axiosInstance.patch<TaskListResponse>(
    `groups/${groupId}/task-lists/${taskListId}`,
    { name }
  );
  return response.data;
};

/**
 * 할 일 목록을 삭제하는 API 함수입니다.
 * @param groupId - 할 일 목록을 받아올 group의 ID입니다.
 * @param taskListId - 할 일 목록의 ID입니다.
 * @returns 완료 시 204 코드를 받고, 응답 본문은 없습니다.
 */
export const deleteTaskList = async (
  groupId: number,
  taskListId: number
): Promise<void> => {
  await axiosInstance.delete<TaskListResponse>(
    `groups/${groupId}/task-lists/${taskListId}`
  );
};

/**
 * 할 일 목록을 생성하는 API 함수입니다.
 * @param groupId - 할 일 목록을 받아올 group의 ID입니다.
 * @param name - 할 일 목록 이름
 * @returns 그룹정보가 담긴 객체를 반환합니다.
 */
export const postTaskList = async (
  groupId: number,
  name: string
): Promise<TaskListResponse> => {
  const response = await axiosInstance.patch<TaskListResponse>(
    `groups/${groupId}/task-lists`,
    { name }
  );
  return response.data;
};

/**
 * 할 일 목록의 순서를 변경하는 API 함수입니다.
 * @param groupId - 할 일 목록을 받아올 group의 ID입니다.
 * @param taskListId - 할 일 목록의 ID입니다.
 * @param displayIndex
 * @returns 완료 시 204 코드를 받고, 응답 본문은 없습니다.
 */
export const patchTaskListOrder = async (
  groupId: number,
  taskListId: number,
  displayIndex: number
): Promise<void> => {
  await axiosInstance.patch(`groups/${groupId}/task-lists/${taskListId}`, {
    displayIndex,
  });
};
