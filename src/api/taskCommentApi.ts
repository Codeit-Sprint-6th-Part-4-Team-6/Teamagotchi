import { TaskCommentInfo, TaskCommentList } from "@coworkers-types";
import { axiosInstance } from "./axios";

/**
 * 댓글을 조회하는 API 함수입니다.
 * @param taskId - 댓글을 받아올 task의 ID입니다.
 * @returns Comments 배열을 반환합니다.
 */
export const getTaskComments = async (taskId: number): Promise<TaskCommentList> => {
  const response = await axiosInstance.get<TaskCommentList>(`tasks/${taskId}/comments`);
  return response.data;
};

/**
 * 댓글을 전송하는 API 함수입니다.
 * @param taskId - 댓글이 달릴 task의 ID입니다.
 * @param content - 댓글 내용입니다.
 * @returns 새로운 comment 객체를 반환합니다.
 */
export const postTaskComment = async (
  taskId: number,
  content: string
): Promise<TaskCommentInfo> => {
  const response = await axiosInstance.post<TaskCommentInfo>(`tasks/${taskId}/comments`, {
    content,
  });
  return response.data;
};

/**
 * 댓글을 수정하는 API 함수입니다.
 * @param taskId - 댓글이 달릴 task의 ID입니다.
 * @param commentId - 수정할 댓글의 ID입니다.
 * @param content - 수정할 댓글 내용입니다.
 * @returns 완료 시 204 코드를 받고, 응답 본문은 없습니다.
 */
export const patchTaskComment = async (
  taskId: number,
  commentId: number,
  content: string
): Promise<void> => {
  await axiosInstance.patch(`tasks/${taskId}/comments/${commentId}`, {
    content,
  });
};

/**
 * 댓글을 삭제하는 API 함수입니다.
 * @param taskId - 댓글이 있는 task의 ID입니다.
 * @param commentId - 삭제할 댓글의 ID입니다.
 * @returns 완료 시 204 코드를 받고, 응답 본문은 없습니다.
 */
export const deleteTaskComment = async (taskId: number, commentId: number): Promise<void> => {
  await axiosInstance.delete(`tasks/${taskId}/comments/${commentId}`);
};
