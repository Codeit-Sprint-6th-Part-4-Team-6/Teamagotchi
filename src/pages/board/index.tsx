import { useEffect, useState } from "react";
import { Article, TotalArticle } from "@coworkers-types";
import {
  DehydratedState,
  HydrationBoundary,
  QueryClient,
  dehydrate,
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import ArticleSection from "@components/board/Article";
import BestArticle from "@components/board/BestArticle";
import Pagination from "@components/board/pagination";
import useMediaQuery from "@hooks/useMediaQuery";
import { axiosInstance } from "@api/axios";

const getArticle = async (page: number, orderBy: string = "recent", keyword: string = "") => {
  const res = await axiosInstance.get("/articles", {
    params: {
      page,
      pageSize: PAGE_SIZE,
      orderBy,
      keyword,
    },
  });
  return res.data;
};

const getSortedArticles = async (pageSize: number) => {
  const res = await axiosInstance.get(`/articles?page=1&pageSize=${pageSize}&orderBy=like`);
  return res.data.list;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  const { query } = context;
  const page = parseInt(query.page as string, 10) || 1;
  const orderBy = (query.orderBy as string) || "recent";
  const keyword = (query.keyword as string) || "";

  await queryClient.prefetchQuery({
    queryKey: ["articles", page, orderBy, keyword],
    queryFn: () => getArticle(page, orderBy, keyword),
  });

  await queryClient.prefetchQuery({
    queryKey: ["sortedArticles", 3],
    queryFn: () => getSortedArticles(3),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const PAGE_SIZE = 3;

export default function BoardPage({ dehydratedState }: { dehydratedState: any }) {
  const router = useRouter();
  const { page, orderBy, keyword } = router.query;
  const [currentPage, setCurrentPage] = useState<number>(parseInt(page as string, 10) || 1);
  const [currentOrderBy, setCurrentOrderBy] = useState<string>((orderBy as string) || "recent");
  const [currentKeyword, setCurrentKeyword] = useState<string>((keyword as string) || "");
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const queryClient = useQueryClient();

  const { isMobile, isTablet, isDesktop } = useMediaQuery();

  let sortedArticleCount: number;

  switch (true) {
    case isMobile:
      sortedArticleCount = 1;
      break;
    case isTablet:
      sortedArticleCount = 2;
      break;
    case isDesktop:
      sortedArticleCount = 3;
      break;
    default:
      sortedArticleCount = 3;
      break;
  }

  const { data: sortedArticles = [] } = useQuery<Article[]>({
    queryKey: ["sortedArticles", sortedArticleCount],
    queryFn: () => getSortedArticles(sortedArticleCount),
  });

  useEffect(() => {
    setCurrentPage(parseInt(page as string, 10) || 1);
    setCurrentOrderBy((orderBy as string) || "recent");
    setCurrentKeyword((keyword as string) || "");
  }, [page, orderBy, keyword]);

  useEffect(() => {
    for (let i = 1; i <= totalCount; i++) {
      queryClient.prefetchQuery({
        queryKey: ["articles", i, currentOrderBy, currentKeyword],
        queryFn: () => getArticle(i, currentOrderBy, currentKeyword),
        staleTime: 30000, // 30초
      });
    }

    for (let i = 1; i <= 2; i++) {
      queryClient.prefetchQuery({
        queryKey: ["sortedArticles", i],
        queryFn: () => getSortedArticles(i),
      });
    }
  });

  const { data } = useQuery<TotalArticle>({
    queryKey: ["articles", currentPage, currentOrderBy, currentKeyword],
    queryFn: () => getArticle(currentPage, currentOrderBy, currentKeyword),
    placeholderData: keepPreviousData,
  });

  const updateURL = (newPage?: number, newOrderBy?: string, newKeyword?: string) => {
    const query: any = {};
    if (newPage !== undefined) query.page = newPage;
    if (newOrderBy !== undefined) query.orderBy = newOrderBy;
    if (newKeyword !== undefined) query.keyword = newKeyword;

    router.push(
      {
        pathname: "/board",
        query,
      },
      undefined,
      { shallow: true }
    );
  };

  const handlePageChange = (newPage: number) => {
    if (
      newPage < 1 ||
      newPage > totalCount ||
      (newPage === 1 && currentPage === 1) ||
      (newPage === totalCount && currentPage === totalCount)
    )
      return;
    setCurrentPage(newPage);
    updateURL(newPage, currentOrderBy, currentKeyword);
  };

  const handleOrderByChange = (newOrderBy: string) => {
    setCurrentOrderBy(newOrderBy);
    updateURL(currentPage, newOrderBy, currentKeyword);
  };

  const handleKeywordEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const target = event.target as HTMLInputElement;
      setCurrentKeyword(target.value);
      updateURL(1, currentOrderBy, target.value);
    }
  };

  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };

  const articles = data?.list ?? [];
  const totalCount = data ? Math.ceil((data.totalCount ?? 1) / PAGE_SIZE) : 1;

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="mx-auto my-0 mt-20 w-full min-w-368 max-w-1200 px-34 py-20">
        <BestArticle Posts={sortedArticles} />
        <ArticleSection
          Posts={articles}
          searchValue={searchKeyword}
          searchChange={handleKeywordChange}
          sortValue={currentOrderBy}
          sortChange={handleOrderByChange}
          onEnter={handleKeywordEnter}
        />
        <Pagination
          totalPages={totalCount}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </HydrationBoundary>
  );
}
