import { useEffect, useMemo, useState } from "react";
import { TotalArticle } from "@coworkers-types";
import {
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
import { getArticleList } from "@api/articleApi";

const PAGE_SIZE = 3;
const MOBILE_SIZE = 1;
const TABLET_SIZE = 2;
const DESKTOP_SIZE = 3;
const INITIAL_ORDER = "recent";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  const { query } = context;
  const page = parseInt(query.page as string, 10) || 1;
  const orderBy = (query.orderBy as string) || INITIAL_ORDER;
  const keyword = (query.keyword as string) || "";

  await queryClient.prefetchQuery({
    queryKey: ["articles", page, orderBy, keyword],
    queryFn: () => getArticleList(page, PAGE_SIZE, orderBy, keyword),
    staleTime: Infinity,
  });

  await queryClient.prefetchQuery({
    queryKey: ["bestArticles"],
    queryFn: () => getArticleList(1, PAGE_SIZE, "like", ""),
    staleTime: Infinity,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function BoardPage({ dehydratedState }: { dehydratedState: any }) {
  const router = useRouter();
  const { page, orderBy, keyword } = router.query;
  const [currentPage, setCurrentPage] = useState<number>(parseInt(page as string, 10) || 1);
  const [currentOrderBy, setCurrentOrderBy] = useState<string>(
    (orderBy as string) || INITIAL_ORDER
  );
  const [currentKeyword, setCurrentKeyword] = useState<string>((keyword as string) || "");
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const queryClient = useQueryClient();

  const { isMobile, isTablet, isDesktop } = useMediaQuery();

  const { data: bestArticles } = useQuery<TotalArticle>({
    queryKey: ["bestArticles"],
    queryFn: () => getArticleList(1, PAGE_SIZE, "like", ""),
  });

  useEffect(() => {
    setCurrentPage(parseInt(page as string, 10) || 1);
    setCurrentOrderBy((orderBy as string) || INITIAL_ORDER);
    setCurrentKeyword((keyword as string) || "");
  }, [page, orderBy, keyword]);

  useEffect(() => {
    for (let i = 1; i <= totalCount; i++) {
      queryClient.prefetchQuery({
        queryKey: ["articles", i, currentOrderBy, currentKeyword],
        queryFn: () => getArticleList(i, PAGE_SIZE, currentOrderBy, currentKeyword),
        staleTime: Infinity,
      });
    }
  });

  const { data } = useQuery<TotalArticle>({
    queryKey: ["articles", currentPage, currentOrderBy, currentKeyword],
    queryFn: () => getArticleList(currentPage, PAGE_SIZE, currentOrderBy, currentKeyword),
    placeholderData: keepPreviousData,
    staleTime: Infinity,
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

  const displayedBestArticles = useMemo(() => {
    const bestArticlesList = bestArticles?.list || [];
    if (isMobile) return bestArticlesList.slice(0, MOBILE_SIZE);
    if (isTablet) return bestArticlesList.slice(0, TABLET_SIZE);
    if (isDesktop) return bestArticlesList.slice(0, DESKTOP_SIZE);
    return bestArticlesList.slice(0, DESKTOP_SIZE);
  }, [bestArticles, isMobile, isTablet, isDesktop]);

  const articles = data?.list ?? [];
  const totalCount = data ? Math.ceil((data.totalCount ?? 1) / PAGE_SIZE) : 1;

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="mx-auto my-0 mt-20 w-full min-w-368 max-w-1200 px-34 py-20">
        <BestArticle Posts={displayedBestArticles} />
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
