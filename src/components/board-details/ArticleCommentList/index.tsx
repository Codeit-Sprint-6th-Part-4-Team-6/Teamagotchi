import { useQuery } from "@tanstack/react-query";
import Comment from "@components/commons/Comment";
import { getArticleComments } from "@api/articleCommentApi";

export default function ArticleCommentList({ articleId }: { articleId: number }) {
  const { data: commentList } = useQuery({
    queryKey: ["articleComments", articleId],
    queryFn: () => getArticleComments(articleId, 3),
  });

  return (
    <div className="flex flex-col gap-16">
      {commentList &&
        commentList.list.map((comment) => (
          <Comment type="article" comment={comment} key={comment.id} />
        ))}
    </div>
  );
}
