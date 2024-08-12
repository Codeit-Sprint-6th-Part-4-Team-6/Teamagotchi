import { useInfiniteQuery } from "@tanstack/react-query";
import Comment from "@components/commons/Comment";
import Spinner from "@components/commons/Spinner";
import { useObserver } from "@hooks/useObserver";
import { getArticleComments } from "@api/articleCommentApi";
import { ARTICLE_COMMENT_LIMIT } from "@constants/ArticleCommentLimit";

/**
 * 게시글의 아이디를 받아 게시글의 댓글 리스트를 렌더링합니다. 무한 스크롤로 구현되어 있습니다.
 * @param articleId: number
 */

export default function ArticleCommentList({ articleId }: { articleId: number }) {
  const {
    data: commentList,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["articleComments", articleId],
    queryFn: ({ pageParam }) => getArticleComments(articleId, ARTICLE_COMMENT_LIMIT, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const { targetRef } = useObserver({ hasNextPage, fetchNextPage, isFetching });

  return (
    <div className="relative flex flex-col gap-16 pb-16">
      {isFetching && <Spinner size={36} color="#64748B" />}

      {!isFetching && commentList && commentList.pages[0].list.length > 0 && (
        <>
          {commentList.pages.map((threeComments) =>
            threeComments.list?.map((comment) => (
              <Comment type="article" comment={comment} articleId={articleId} key={comment.id} />
            ))
          )}
        </>
      )}

      {!isFetching && commentList?.pages[0].list.length === 0 && (
        <div className="flex h-300 items-center justify-center text-md font-medium text-text-default md:text-lg">
          아직 작성된 댓글이 없습니다.
        </div>
      )}

      {!isFetching && hasNextPage && <div ref={targetRef} className="absolute bottom-400" />}
    </div>
  );
}
