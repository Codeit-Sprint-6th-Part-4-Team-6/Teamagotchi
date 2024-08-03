import { useState } from "react";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
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

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["articles", 1],
    queryFn: async () => {
      const res = await axiosInstance.get(`/articles?page=1&pageSize=1`);
      return res.data;
    },
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function BoardPage({ dehydratedState }: { dehydratedState: any }) {
  const [page, setPage] = useState(1);

  const {
    data: articlesData,
    isLoading,
    isError,
  } = useQuery<RootObject>({
    queryKey: ["articles", page],
    queryFn: async () => {
      const res = await axiosInstance.get(`/articles?page=${page}&pageSize=1`);
      return res.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  const articles = articlesData?.list ?? [];
  const sortedArticles = [...articles].sort((a, b) => b.likeCount - a.likeCount).slice(0, 3);

  return (
    <div className="mx-auto my-0 w-full min-w-368 max-w-1200 px-34 py-0">
      <BestArticle Posts={sortedArticles} />
      <Article Posts={articles} />
      <div className="flex justify-between">
        <Button size="small" onClick={() => setPage((old) => Math.max(old - 1, 1))}>
          이전 페이지
        </Button>
        <Button size="small" onClick={() => setPage((old) => old + 1)}>
          다음 페이지
        </Button>
      </div>
    </div>
  );
}
