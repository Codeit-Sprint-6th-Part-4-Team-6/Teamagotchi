import { useEffect, useState } from "react";
import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
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

const getArticle = async (page: number) => {
  const res = await axiosInstance.get(`/articles?page=${page}&pageSize=1`);
  return res.data;
};

const getSortedArticles = async () => {
  const res = await axiosInstance.get(`/articles?page=1&pageSize=3&orderBy=like`);
  return res.data.list;
};

export default function BoardPage() {
  const [page, setPage] = useState(1);
  const [sortedArticles, setSortedArticles] = useState<List[]>([]);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (page !== totalCount) {
      queryClient.prefetchQuery({
        queryKey: ["articles", page + 1],
        queryFn: () => getArticle(page + 1),
        staleTime: 30000, // 30초
      });
    }
  }, [page, queryClient]);

  useEffect(() => {
    const fetchSortedArticles = async () => {
      const data = await getSortedArticles();
      setSortedArticles(data);
    };

    fetchSortedArticles();
  }, []);

  const { data, isPlaceholderData } = useQuery<RootObject>({
    queryKey: ["articles", page],
    queryFn: () => getArticle(page),
    placeholderData: keepPreviousData,
  });

  const articles = data?.list ?? [];
  const totalCount = data?.totalCount ?? 0;

  return (
    <div className="mx-auto my-0 w-full min-w-368 max-w-1200 px-34 py-0">
      <BestArticle Posts={sortedArticles} />
      <Article Posts={articles} />
      <div className="flex justify-between">
        <Button
          size="small"
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1 || isPlaceholderData}
        >
          이전 페이지
        </Button>
        <Button
          size="small"
          onClick={() => setPage((old) => old + 1)}
          disabled={page === totalCount || isPlaceholderData}
        >
          다음 페이지
        </Button>
      </div>
    </div>
  );
}
