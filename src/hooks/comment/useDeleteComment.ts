import {
  ArticleComment,
  ArticleCommentsWithParams,
  TaskComment,
  TaskCommentList,
} from "@coworkers-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isTaskCommentType } from "@utils/typeGuard/isTaskCommentType";
import { deleteArticleComment } from "@api/articleCommentApi";
import { deleteTaskComment } from "@api/taskCommentApi";

/**
 * 댓글 삭제 뮤테이션을 제공하는 훅입니다.
 */

const useDeleteComment = (articleId?: number) => {
  const queryClient = useQueryClient();

  const deleteCommentMutation = useMutation({
    mutationFn: async (comment: TaskComment | ArticleComment) => {
      if (isTaskCommentType(comment)) {
        return deleteTaskComment(comment.taskId, comment.id);
      }
      return deleteArticleComment(comment.id);
    },

    onMutate: async (comment) => {
      await queryClient.cancelQueries({
        queryKey: isTaskCommentType(comment)
          ? ["taskComments", comment.taskId]
          : ["articleComments", articleId],
      });

      const previousComments = queryClient.getQueryData(
        isTaskCommentType(comment)
          ? ["taskComments", comment.taskId]
          : ["articleComments", articleId]
      );

      queryClient.setQueryData(
        isTaskCommentType(comment)
          ? ["taskComments", comment.taskId]
          : ["articleComments", articleId],
        (oldComments: TaskCommentList | ArticleCommentsWithParams) => {
          if (isTaskCommentType(comment)) {
            return (oldComments as TaskCommentList).filter(
              (oldComment) => oldComment.id !== comment.id
            );
          }
          return {
            pageParams: (oldComments as ArticleCommentsWithParams).pageParams,
            pages: (oldComments as ArticleCommentsWithParams).pages.map((page) => ({
              list: page.list.filter((articleComment) => articleComment.id !== comment.id),
              nextCursor: page.nextCursor,
            })),
          };
        }
      );

      return { previousComments };
    },

    onError: (error, variables, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(
          isTaskCommentType(variables)
            ? ["taskComments", variables.taskId]
            : ["articleComments", articleId],
          context.previousComments
        );
      }
    },

    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({
        queryKey: isTaskCommentType(variables)
          ? ["taskComments", variables.taskId]
          : ["articleComments", articleId],
      });
    },
  });

  return deleteCommentMutation;
};

export default useDeleteComment;
