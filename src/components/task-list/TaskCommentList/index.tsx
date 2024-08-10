import { useQuery } from "@tanstack/react-query";
import Comment from "@components/commons/Comment";
import { sortCommentList } from "@utils/sortCommentList";
import { getTaskComments } from "@api/taskCommentApi";

export default function TaskCommentList({ taskId }: { taskId: number }) {
  const { data: commentList } = useQuery({
    queryKey: ["taskComments", taskId],
    queryFn: () => getTaskComments(taskId),
  });

  return (
    <div className="flex flex-col gap-16 pb-16">
      {commentList &&
        sortCommentList(commentList)?.map((comment) => (
          <Comment type="task" comment={comment} key={comment.id} />
        ))}
    </div>
  );
}
