import { ArticleComment, TaskComment } from "@coworkers-types";

/**
 * 댓글의 종류를 보장하는 타입가드 함수입니다.
 * @param comment 두 가지 타입(TaskComment | ArticleComment)의 댓글을 받습니다.
 * @returns TaskComment면 true, 아니면 false를 리턴합니다
 */

export const isTaskCommentType = (comment: TaskComment | ArticleComment): comment is TaskComment =>
  (comment as TaskComment).user !== undefined;
