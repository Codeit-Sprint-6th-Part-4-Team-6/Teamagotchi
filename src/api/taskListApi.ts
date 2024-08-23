import { TaskList, TaskListInfo } from "@coworkers-types";
import { axiosInstance } from "./axios";

/**
 * 할 일 목록을 조회하는 API 함수입니다.
 * @param groupId - 할 일 목록을 받아올 group의 ID입니다.
 * @param taskListId - 조회할 할 일 목록의 ID입니다.
 * @param date - 특정 날짜의 데이터를 조회할 때 사용 (선택 사항).
 * @returns 조회된 할 일 목록 객체를 반환합니다.
 */
export const getTaskList = async (
  groupId: string | string[] | undefined,
  taskListId: string | string[] | undefined,
  date: string,
  token?: string
): Promise<TaskList> => {
  const params = new URLSearchParams();
  params.append("date", date);

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const response = await axiosInstance.get<TaskList>(
    `groups/${groupId}/task-lists/${taskListId}?${params.toString()}`,
    {
      headers,
    }
  );
  return response.data;
};

/**
 * 할 일 목록을 수정하는 API 함수입니다.
 * @param groupId - 할 일 목록을 받아올 group의 ID입니다.
 * @param taskListId - 수정할 할 일 목록의 ID입니다.
 * @param name - 새로운 할 일 목록 이름입니다.
 * @returns 그룹정보와 할 일 목록이 담긴 객체를 반환합니다.
 */
export const patchTaskList = async (
  groupId: string | string[] | undefined,
  taskListId: string | string[] | undefined,
  name: string
): Promise<TaskListInfo> => {
  const response = await axiosInstance.patch<TaskListInfo>(
    `groups/${groupId}/task-lists/${taskListId}`,
    { name }
  );
  return response.data;
};

/**
 * 할 일 목록을 삭제하는 API 함수입니다.
 * @param groupId - 할 일 목록이 포함된 그룹의 ID입니다.
 * @param taskListId - 삭제할 할 일 목록의 ID입니다.
 * @returns 완료 시 204 코드를 받고, 응답 본문은 없습니다.
 */
export const deleteTaskList = async (
  groupId: string | string[] | undefined,
  taskListId: string | string[] | undefined
): Promise<void> => {
  await axiosInstance.delete<TaskListInfo>(`groups/${groupId}/task-lists/${taskListId}`);
};

/**
 * 새로운 할 일 목록을 생성하는 API 함수입니다.
 * @param groupId - 할 일 목록을 생성할 그룹의 ID입니다.
 * @param name - 생성할 할 일 목록의 이름입니다.
 * @returns 생성된 할 일 목록 정보가 담긴 객체를 반환합니다.
 */
export const postTaskList = async (
  groupId: string | string[] | undefined,
  name: string
): Promise<TaskListInfo> => {
  const response = await axiosInstance.post<TaskListInfo>(`groups/${groupId}/task-lists`, {
    name,
  });
  return response.data;
};

/**
 * 할 일 목록의 순서를 변경하는 API 함수입니다.
 * @param groupId - 순서를 변경할 할 일 목록이 포함된 그룹의 ID입니다.
 * @param taskListId - 순서를 변경할 할 일 목록의 ID입니다.
 * @param displayIndex - 새로 설정할 순서의 인덱스입니다.
 * @returns 완료 시 204 코드를 받고, 응답 본문은 없습니다.
 */
export const patchTaskListOrder = async (
  groupId: string | string[] | undefined,
  taskListId: string | string[] | undefined,
  displayIndex: number
): Promise<void> => {
  await axiosInstance.patch(`groups/${groupId}/task-lists/${taskListId}`, {
    displayIndex,
  });
};
