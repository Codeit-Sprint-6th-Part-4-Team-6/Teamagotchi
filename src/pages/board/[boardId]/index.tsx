import { ArticleDetails } from "@coworkers-types";
import { QueryClient, dehydrate, keepPreviousData, useQuery } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import Head from "next/head";
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
    <>
      <Head>
        <title>티마고치 | 자유게시판-{ArticleData?.title}</title>
        <meta
          name="description"
          content={`티마고치 자유게시판: "${ArticleData?.title}". 사람들과 자유롭게 소통하며 혁신적인 아이디어를 발견하는 곳입니다.`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="mx-auto my-0 mt-20 w-full min-w-368 max-w-1200 px-34 py-20">
        <ArticleDetail article={ArticleData} />
        <CommentSection boardId={Number(boardId)} />
        <ArticleCommentList articleId={Number(boardId)} />
      </div>
    </>
  );
}
