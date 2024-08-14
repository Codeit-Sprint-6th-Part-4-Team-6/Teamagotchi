import { ArticleCommentList as ArticleCommentListType, ArticleDetails } from "@coworkers-types";
import { QueryClient, dehydrate, keepPreviousData, useQuery } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import ArticleCommentList from "@components/board-details/ArticleCommentList";
import ArticleDetail from "@components/board/ArticleDetail";
import CommentSection from "@components/board/ArticleDetail/CommentSection";
import Comment from "@components/commons/Comment";
import { getArticle } from "@api/articleApi";
import { getArticleComments } from "@api/articleCommentApi";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  const { boardId } = context.query;
  const token = context.req.cookies["accessToken"];

  try {
    await queryClient.fetchQuery({
      queryKey: ["article", boardId],
      queryFn: () => getArticle(boardId as string, token),
      staleTime: Infinity,
    });
    // await queryClient.fetchQuery({
    //   queryKey: ["comment", Number(boardId)],
    //   queryFn: () => getArticleComments(Number(boardId), 999),
    // });
  } catch (error) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function BoardDetailPage() {
  const router = useRouter();
  const { boardId } = router.query;

  const { data: ArticleData, refetch } = useQuery<ArticleDetails>({
    queryKey: ["article", boardId],
    queryFn: () => getArticle(boardId as string),
    placeholderData: keepPreviousData,
    staleTime: Infinity,
  });

  // const { data: CommentData } = useQuery<ArticleCommentListType>({
  //   queryKey: ["comment", Number(boardId)],
  //   queryFn: () => getArticleComments(Number(boardId), 999),
  //   placeholderData: keepPreviousData,
  //   staleTime: Infinity,
  // });

  return (
    <div className="mx-auto my-0 mt-20 flex w-full min-w-368 max-w-1200 flex-col gap-24 px-34 py-20">
      <ArticleDetail article={ArticleData} refetch={refetch} />
      <CommentSection boardId={Number(boardId)} />
      {/* {CommentData?.list.map((comment) => (
        <Comment type="article" comment={comment} articleId={Number(boardId)} />
      ))} */}
      <ArticleCommentList articleId={Number(boardId)} />
    </div>
  );
}
