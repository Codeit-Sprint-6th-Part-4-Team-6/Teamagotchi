import { useState } from "react";
import { ArticleCommentsWithParams } from "@coworkers-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "@components/commons/Button";
import Label from "@components/commons/Label";
import Textarea from "@components/commons/TextArea";
import { useToast } from "@hooks/useToast";
import { useAuthStore } from "@store/useAuthStore";
import { postArticleComment } from "@api/articleCommentApi";

export default function CommentSection({ boardId }: { boardId: number }) {
  const [comment, setComment] = useState<string>("");
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const { mutate: postMutation } = useMutation({
    mutationFn: (content: string) => postArticleComment(boardId, content),
    onMutate: async (content) => {
      await queryClient.cancelQueries({ queryKey: ["articleComments", boardId] });

      const previousComments = queryClient.getQueryData<ArticleCommentsWithParams>([
        "articleComments",
        boardId,
      ]);

      queryClient.setQueryData<ArticleCommentsWithParams>(
        ["articleComments", boardId],
        (oldComments) => {
          toast("success", "댓글을 작성하였습니다.");
          setComment("");
          if (!oldComments) {
            return {
              pages: [
                {
                  nextCursor: 0,
                  list: [
                    {
                      id: 1,
                      content,
                      createdAt: new Date().toISOString(),
                      updatedAt: new Date().toISOString(),
                      writer: {
                        image: (user?.image as string | null) ?? "",
                        nickname: user?.nickname ?? "",
                        id: user?.id ?? 1,
                      },
                    },
                  ],
                },
              ],
              pageParams: [0],
            };
          }

          const updatedPages = oldComments.pages.map((page, index) => {
            if (index === 0) {
              return {
                ...page,
                list: [
                  {
                    id: 1,
                    content,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    writer: {
                      image: (user?.image as string | null) ?? "",
                      nickname: user?.nickname ?? "",
                      id: user?.id ?? 1,
                    },
                  },
                  ...page.list,
                ],
              };
            }

            return page;
          });

          return {
            ...oldComments,
            pages: updatedPages,
          };
        }
      );

      return { previousComments };
    },
    onError: (error, newComment, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(["articleComments", boardId], context.previousComments);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["articleComments", boardId] });
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
        <Button size="medium" disabled={comment.length < 1} onClick={() => postMutation(comment)}>
          등록
        </Button>
      </div>
    </div>
  );
}
