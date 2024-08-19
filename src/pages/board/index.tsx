import { useEffect, useMemo, useState } from "react";
import { TotalArticle } from "@coworkers-types";
import {
  QueryClient,
  dehydrate,
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import ArticleSection from "@components/board/ArticleSection";
import BestArticleSection from "@components/board/BestArticleSection";
import Pagination from "@components/board/pagination";
import useMediaQuery from "@hooks/useMediaQuery";
import usePagination from "@hooks/usePagination";
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

export default function BoardPage() {
  const router = useRouter();
  const { page, orderBy, keyword } = router.query;
  const [currentPage, setCurrentPage] = useState<number>(parseInt(page as string, 10) || 1);
  const [currentOrderBy, setCurrentOrderBy] = useState<string>(
    (orderBy as string) || INITIAL_ORDER
  );
  const [currentKeyword, setCurrentKeyword] = useState<string>((keyword as string) || "");
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const queryClient = useQueryClient();

  const { handlePageChange, handleOrderByChange, handleKeywordEnter } = usePagination(
    currentPage,
    currentOrderBy,
    currentKeyword
  );

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
    <div className="mx-auto my-0 mt-20 w-full min-w-368 max-w-1200 px-34 py-20">
      <BestArticleSection Posts={displayedBestArticles} />
      <ArticleSection
        Posts={articles}
        searchValue={searchKeyword}
        searchChange={setSearchKeyword}
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
  );
}
