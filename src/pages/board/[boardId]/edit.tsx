import { ArticleDetails } from "@coworkers-types";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import BoardForm from "@components/board/BoardForm/BoardForm";
import Loading from "@components/commons/LottieAnimation/Loading";
import { getArticle } from "@api/articleApi";

export default function EditBoardPage() {
  const router = useRouter();
  const { boardId } = router.query;

  const { data: articleData, isLoading } = useQuery<ArticleDetails>({
    queryKey: ["article", boardId],
    queryFn: () => getArticle(boardId as string),
    staleTime: Infinity,
    enabled: !!boardId,
  });

  if (isLoading) {
    return (
      <div className="mx-auto mt-20 w-full min-w-368 max-w-1200 px-34 py-20">
        <Loading />
      </div>
    ); // 로딩 상태 표시
  }

  if (!articleData) {
    return (
      <div className="mx-auto mt-20 w-full min-w-368 max-w-1200 px-34 py-20">
        <div className="flex h-[75vh] items-center justify-center">
          게시글을 불러올 수 없습니다.
        </div>
      </div>
    ); // 데이터가 없을 때 오류 처리
  }

  return (
    <div>
      <BoardForm
        boardId={boardId}
        initialData={{
          title: articleData.title,
          content: articleData.content,
          image: articleData.image,
        }}
      />
    </div>
  );
}
