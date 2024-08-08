import { ArticleComment, ArticleCommentList, Message } from "@coworkers-types";
import { axiosInstance } from "./axios";

/**
 * 게시글의 댓글을 작성하는 API 함수입니다.
 * @param articleId - article의 ID입니다.
 * @param content - 전송하고자 하는 댓글 내용
 * @returns 댓글 작성자 정보와 댓글 내용을 객체로 반환합니다. 오류 발생시 메세지 객체를 반환합니다.
 */
export const postArticleComment = async (
  articleId: number,
  content: string
): Promise<ArticleComment | Message> => {
  const response = await axiosInstance.post<ArticleComment | Message>(
    `articles/${articleId}/comments`,
    { content }
  );
  return response.data;
};

/**
 * 게시글의 댓글 목록을 조회하는 API 함수입니다.
 * @param articleId - article의 ID입니다.
 * @param limit - 한 번에 조회할 댓글의 수
 * @param cursor - 페이지네이션을 위한 커서
 * @returns 댓글 작성자 정보와 댓글 내용이 담긴 리스트를 배열로 반환합니다. 오류 발생시 메세지 객체를 반환합니다.
 */
export const getArticleComments = async (
  articleId: number,
  limit: number,
  cursor?: number
): Promise<ArticleCommentList> => {
  const params = new URLSearchParams({
    limit: limit.toString(),
    cursor: cursor ? cursor.toString() : "0",
  });

  const response = await axiosInstance.get<ArticleCommentList>(
    `articles/${articleId}/comments?${params}`
  );
  return response.data;
};

/**
 * 게시글의 댓글을 수정하는 API 함수입니다.
 * @param commentId - comment ID입니다.
 * @param content - 새로 수정한 댓글 내용
 * @returns 댓글 작성자 정보와 댓글 내용을 객체로 반환합니다. 오류 발생시 메세지 객체를 반환합니다.
 */
export const patchArticleComment = async (commentId: number, content: string): Promise<void> => {
  await axiosInstance.patch<ArticleComment>(`comments/${commentId}`, {
    content,
  });
};

/**
 * 게시글의 댓글을 삭제하는 API 함수입니다.
 * @param commentId - 삭제하고자 하는 comment ID입니다.
 * @returns ID를 반환합니다. 오류 발생시 메세지 객체를 반환합니다.
 */
export const deleteArticleComment = async (commentId: number): Promise<void> => {
  await axiosInstance.patch<number | Message>(`comments/${commentId}`);
};
