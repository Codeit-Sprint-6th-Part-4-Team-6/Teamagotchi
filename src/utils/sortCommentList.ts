import { ArticleComment, Comments } from "@coworkers-types";

/**
 * 댓글을 생성일자 순(최신순)으로 정렬해주는 함수입니다.
 * @param comments - 할 일의 댓글 배열 혹은 게시글의 댓글 배열을 받습니다.
 * @returns 기본적으로 정렬된 배열을 반환하지만, 댓글 배열이 제대로 넘어오지 않았을 때는 undefined를 반환합니다.
 */

export const sortCommentList = (comments: Comments | ArticleComment[] | undefined) => {
  if (comments) {
    const sortedComments = [...comments].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return sortedComments;
  }
  return undefined;
};
