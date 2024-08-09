import { useQuery } from "@tanstack/react-query";
import Comment from "@components/commons/Comment";
import { sortCommentList } from "@utils/sortCommentList";
import { getComments } from "@api/commentApi";

export default function TaskCommentList({ taskId }: { taskId: number }) {
  const { data: commentList } = useQuery({
    queryKey: ["taskComments", taskId],
    queryFn: () => getComments(taskId),
  });

  return (
    <div className="flex flex-col gap-16">
      {commentList &&
        sortCommentList(commentList)?.map((comment) => (
          <Comment type="task" comment={comment} key={comment.id} />
        ))}
    </div>
  );
}
