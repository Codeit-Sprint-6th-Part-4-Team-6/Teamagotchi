import { useQuery } from "@tanstack/react-query";
import Comment from "@components/commons/Comment";
import { sortCommentList } from "@utils/sortCommentList";
import { getTaskComments } from "@api/taskCommentApi";

/**
 * 할 일의 아이디를 받아 해당 할 일의 댓글 리스트를 렌더링합니다.
 * @param taskId: number
 */

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
