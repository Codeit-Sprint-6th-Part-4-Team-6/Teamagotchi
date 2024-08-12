import { ArticleDetails } from "@coworkers-types";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
  keepPreviousData,
  useQuery,
} from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import ArticleDetail from "@components/board/ArticleDetail";
import { getArticle } from "@api/articleApi";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  const { boardId } = context.query;

  await queryClient.prefetchQuery({
    queryKey: ["article", boardId],
    queryFn: () => getArticle(boardId as string),
    staleTime: Infinity,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
export default function BoardDetailPage({ dehydratedState }: { dehydratedState: any }) {
  const router = useRouter();
  const { boardId } = router.query;

  const { data: ArticleData } = useQuery<ArticleDetails>({
    queryKey: ["article", boardId],
    queryFn: () => getArticle(boardId as string),
    placeholderData: keepPreviousData,
    staleTime: Infinity,
  });

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="mx-auto my-0 mt-20 w-full min-w-368 max-w-1200 px-34 py-20">
        <ArticleDetail article={ArticleData} />
      </div>
    </HydrationBoundary>
  );
}
