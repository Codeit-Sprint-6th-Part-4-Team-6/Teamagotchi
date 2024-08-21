import { ArticleDetails } from "@coworkers-types";
import { QueryClient, dehydrate, keepPreviousData, useQuery } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import ArticleDetail from "@components/board/ArticleDetail";
import ArticleCommentList from "@components/board/ArticleDetail/CommentList";
import CommentSection from "@components/board/ArticleDetail/CommentSection";
import { getArticle } from "@api/articleApi";

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

  const { data: ArticleData } = useQuery<ArticleDetails>({
    queryKey: ["article", boardId],
    queryFn: () => getArticle(boardId as string),
    placeholderData: keepPreviousData,
    staleTime: Infinity,
  });

  return (
    <div className="mx-auto my-0 mt-20 flex w-full min-w-368 max-w-1200 flex-col gap-24 px-34 py-20">
      <ArticleDetail article={ArticleData} />
      <CommentSection boardId={Number(boardId)} />
      <ArticleCommentList articleId={Number(boardId)} />
    </div>
  );
}
