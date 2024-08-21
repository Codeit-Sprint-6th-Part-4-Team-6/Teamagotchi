import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "@components/commons/Button";
import Label from "@components/commons/Label";
import Textarea from "@components/commons/TextArea";
import { useToast } from "@hooks/useToast";
import { postArticleComment } from "@api/articleCommentApi";

export default function CommentSection({ boardId }: { boardId: number }) {
  const [comment, setComment] = useState<string>("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const { mutate: postMutation, isPending } = useMutation({
    mutationFn: () => postArticleComment(boardId, comment),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["articleComments"] }),
    onSettled: () => {
      toast("success", "댓글을 작성하였습니다.");
      setComment("");
    },
  });

  return (
    <div className="flex flex-col gap-12">
      <Label type="label" htmlFor="commentTextarea" content="댓글 달기" />
      <Textarea
        id="commentTextarea"
        placeholder="댓글을 입력해주세요."
        type="big"
        value={comment}
        onChange={handleTextareaChange}
      />
      <div className="flex justify-end">
        <Button
          size="medium"
          disabled={comment.length < 1 || isPending}
          onClick={postMutation}
          isPending={isPending}
        >
          등록
        </Button>
      </div>
    </div>
  );
}
