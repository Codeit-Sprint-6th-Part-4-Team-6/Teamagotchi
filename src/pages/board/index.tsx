import { useEffect, useState } from "react";
import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import Article from "@components/board/Article";
import BestArticle from "@components/board/BestArticle";
import Button from "@components/commons/Button";
import { axiosInstance } from "../api/axios";

interface RootObject {
  list: List[];
  totalCount: number;
}

interface List {
  id: number;
  title: string;
  image: null;
  createdAt: string;
  updatedAt: string;
  writer: Writer;
  likeCount: number;
}

interface Writer {
  id: number;
  nickname: string;
}

const getArticle = async (page: number, orderBy: string = "recent", keyword: string = "") => {
  const res = await axiosInstance.get("/articles", {
    params: {
      page,
      pageSize: 1,
      orderBy,
      keyword,
    },
  });
  return res.data;
};

const getSortedArticles = async () => {
  const res = await axiosInstance.get(`/articles?page=1&pageSize=3&orderBy=like`);
  return res.data.list;
};

export default function BoardPage() {
  const router = useRouter();
  const { page, orderBy, keyword } = router.query;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentOrderBy, setCurrentOrderBy] = useState<string>("recent");
  const [currentKeyword, setCurrentKeyword] = useState<string>("");
  const [sortedArticles, setSortedArticles] = useState<List[]>([]);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (currentPage !== totalCount) {
      queryClient.prefetchQuery({
        queryKey: ["articles", currentPage + 1, currentOrderBy, currentKeyword],
        queryFn: () => getArticle(currentPage + 1, currentOrderBy, currentKeyword),
        staleTime: 30000, // 30초
      });
    }
  }, [currentPage, queryClient]);

  useEffect(() => {
    const fetchSortedArticles = async () => {
      const data = await getSortedArticles();
      setSortedArticles(data);
    };

    fetchSortedArticles();
  }, []);

  const { data, isPlaceholderData } = useQuery<RootObject>({
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
  useEffect(() => {
    setCurrentPage(parseInt(page as string, 10) || 1);
    setCurrentOrderBy((orderBy as string) || "recent");
    setCurrentKeyword((keyword as string) || "");
  });

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    updateURL(newPage, currentOrderBy, currentKeyword);
  };

  const handleOrderByChange = (newOrderBy: string) => {
    setCurrentOrderBy(newOrderBy);
    updateURL(currentPage, newOrderBy, currentKeyword);
  };

  const handleKeywordChange = (newKeyword: string) => {
    setCurrentKeyword(newKeyword);
    updateURL(1, currentOrderBy, newKeyword);
  };

  const articles = data?.list ?? [];
  const totalCount = data?.totalCount ?? 0;

  return (
    <div className="mx-auto my-0 w-full min-w-368 max-w-1200 px-34 py-0">
      <BestArticle Posts={sortedArticles} />
      <Article Posts={articles} />
      <div className="flex justify-between">
        <Button
          size="small"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || isPlaceholderData}
        >
          이전 페이지
        </Button>
        <Button
          size="small"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalCount || isPlaceholderData}
        >
          다음 페이지
        </Button>
      </div>
    </div>
  );
}
