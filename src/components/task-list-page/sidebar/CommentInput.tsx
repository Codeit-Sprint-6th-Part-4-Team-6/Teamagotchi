import { useState } from "react";
import { TaskCommentList } from "@coworkers-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import Textarea from "@components/commons/TextArea";
import { useToast } from "@hooks/useToast";
import { useAuthStore } from "@store/useAuthStore";
import { IconEnterActive, IconEnterDefault } from "@utils/icon";
import { postTaskComment } from "@api/taskCommentApi";

export default function CommentInput({ taskId }: { taskId: number }) {
  const [textareaComment, setTextareaComment] = useState<string>("");
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const { toast } = useToast();

  const handleChangeTextarea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaComment(event.target.value);
  };

  const { mutate: postComment } = useMutation({
    mutationFn: (content) => postTaskComment(taskId, content),
    onMutate: async (content: string) => {
      await queryClient.cancelQueries({ queryKey: ["taskComments", taskId] });

      const previousComments = queryClient.getQueryData(["taskComments", taskId]);

      queryClient.setQueryData<TaskCommentList>(
        ["taskComments", taskId],
        (oldComments: TaskCommentList = []) => [
          {
            id: 1,
            content,
            userId: user?.id ?? 1,
            taskId,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            user: {
              image: null,
              nickname: user?.nickname ?? "",
              id: user?.id ?? 1,
            },
          },
          ...oldComments,
        ]
      );

      toast("success", "댓글을 작성하였습니다.");
      setTextareaComment("");

      return { previousComments };
    },
    onError: (error, newComment, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(["taskComments", taskId], context.previousComments);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["taskComments", taskId] });
    },
  });

  const postIconClass = classNames("absolute right-0 top-13 cursor-pointer");

  return (
    <div className="relative">
      <Textarea
        type="innerButton"
        placeholder="댓글을 달아주세요."
        height={50}
        value={textareaComment}
        onChange={handleChangeTextarea}
      />
      {textareaComment.length > 0 ? (
        <IconEnterActive className={postIconClass} onClick={() => postComment(textareaComment)} />
      ) : (
        <IconEnterDefault className={postIconClass} />
      )}
    </div>
  );
}
