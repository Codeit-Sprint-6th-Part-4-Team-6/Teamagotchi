import { useQuery } from "@tanstack/react-query";
import Comment from "@components/commons/Comment";
import { getComments } from "@api/commentApi";

export default function TaskCommentList({ taskId }: { taskId: number }) {
  const { data: commentList } = useQuery({
    queryKey: ["taskComments", taskId],
    queryFn: () => getComments(taskId),
  });

  return (
    <div className="flex flex-col gap-16">
      {commentList && commentList.map((comment) => <Comment type="task" comment={comment} />)}
    </div>
  );
}
