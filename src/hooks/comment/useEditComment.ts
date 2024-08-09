import { ArticleComment, TaskComment, TaskCommentList } from "@coworkers-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isTaskCommentType } from "@utils/typeGuard/isTaskCommentType";
import { patchArticleComment } from "@api/articleCommentApi";
import { patchTaskComment } from "@api/taskCommentApi";

/**
 * 댓글 수정 뮤테이션을 제공하는 훅입니다.
 */

const useEditComment = () => {
  const queryClient = useQueryClient();

  const editCommentMutation = useMutation({
    mutationFn: ({
      comment,
      content,
    }: {
      comment: TaskComment | ArticleComment;
      content: string;
    }) => {
      if (isTaskCommentType(comment)) {
        return patchTaskComment(comment.taskId, comment.id, content);
      }
      return patchArticleComment(comment.id, content);
    },

    onMutate: async ({ comment, content }) => {
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
          oldComments.map((oldComment: TaskComment | ArticleComment) =>
            oldComment.id === comment.id ? { ...oldComment, content } : oldComment
          )
      );

      return { previousComments };
    },

    onError: (error, variables, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(
          isTaskCommentType(variables.comment)
            ? ["taskComments", variables.comment.taskId]
            : ["articleComments", variables.comment.id],
          context.previousComments
        );
      }
    },

    onSettled: (data, error, variables) =>
      queryClient.invalidateQueries({
        queryKey: isTaskCommentType(variables.comment)
          ? ["taskComments", variables.comment.taskId]
          : ["articleComments", variables.comment.id],
      }),
  });

  return editCommentMutation;
};

export default useEditComment;
