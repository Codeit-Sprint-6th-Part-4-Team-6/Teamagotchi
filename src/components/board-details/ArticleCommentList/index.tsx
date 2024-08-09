import { ArticleComment } from "@coworkers-types";
import { useQuery } from "@tanstack/react-query";
import Comment from "@components/commons/Comment";
import { getArticleComments } from "@api/articleCommentApi";

export default function ArticleCommentList({ articleId }: { articleId: number }) {
  const { data: commentList } = useQuery({
    queryKey: ["articleComments", articleId],
    queryFn: () => getArticleComments(articleId, 3),
  });

  const sortCommentList = (comments: ArticleComment[] | undefined) => {
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
        sortCommentList(commentList.list)?.map((comment) => (
          <Comment type="article" comment={comment} key={comment.id} />
        ))}
    </div>
  );
}
