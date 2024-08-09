import { ArticleComment, TaskComment, TaskCommentList } from "@coworkers-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isTaskCommentType } from "@utils/typeGuard/isTaskCommentType";
import { deleteArticleComment } from "@api/articleCommentApi";
import { deleteTaskComment } from "@api/taskCommentApi";

/**
 * 댓글 삭제 뮤테이션을 제공하는 훅입니다.
 */

const useDeleteComment = () => {
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
          : ["articleComments", comment.id],
      });

      const previousComments = queryClient.getQueryData(
        isTaskCommentType(comment)
          ? ["taskComments", comment.taskId]
          : ["articleComments", comment.id]
      );

      queryClient.setQueryData(
        isTaskCommentType(comment)
          ? ["taskComments", comment.taskId]
          : ["articleComments", comment.id],
        (oldComments: TaskCommentList | ArticleComment[]) =>
          oldComments.filter((oldComment) => oldComment.id !== comment.id)
      );

      return { previousComments };
    },

    onError: (error, variables, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(
          isTaskCommentType(variables)
            ? ["taskComments", variables.taskId]
            : ["articleComments", variables.id],
          context.previousComments
        );
      }
    },

    onSettled: (data, error, variables) =>
      queryClient.invalidateQueries({
        queryKey: isTaskCommentType(variables)
          ? ["taskComments", variables.taskId]
          : ["articleComments", variables.id],
      }),
  });

  return deleteCommentMutation;
};

export default useDeleteComment;
