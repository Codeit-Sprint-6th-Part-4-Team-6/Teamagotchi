import { Comments } from "@coworkers-types";
import { useQuery } from "@tanstack/react-query";
import Comment from "@components/commons/Comment";
import { getComments } from "@api/commentApi";

export default function TaskCommentList({ taskId }: { taskId: number }) {
  const { data: commentList } = useQuery({
    queryKey: ["taskComments", taskId],
    queryFn: () => getComments(taskId),
  });

  const sortCommentList = (comments: Comments | undefined) => {
    if (comments) {
      const sortedComments = [...comments].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      return sortedComments;
    }
    return undefined;
  };

  return (
    <div className="flex flex-col gap-16">
      {commentList &&
        sortCommentList(commentList)?.map((comment) => (
          <Comment type="task" comment={comment} key={comment.id} />
        ))}
    </div>
  );
}
