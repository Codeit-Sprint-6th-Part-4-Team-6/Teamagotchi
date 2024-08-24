import { useState } from "react";
import { useRouter } from "next/router";

const usePagination = (initialPage: number, initialOrderBy: string, initialKeyword: string) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [currentOrderBy, setCurrentOrderBy] = useState<string>(initialOrderBy);
  const [currentKeyword, setCurrentKeyword] = useState<string>(initialKeyword);

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

  return {
    currentPage,
    currentOrderBy,
    currentKeyword,
    handlePageChange,
    handleOrderByChange,
    handleKeywordEnter,
    updateURL,
  };
};

export default usePagination;
