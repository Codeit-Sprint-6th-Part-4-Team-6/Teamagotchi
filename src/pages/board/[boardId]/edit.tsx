import { ArticleDetails } from "@coworkers-types";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { getArticle } from "@api/articleApi";

export default function EditBoardPage() {
  const router = useRouter();
  const { boardId } = router.query;

  const { data: ArticleData } = useQuery<ArticleDetails>({
    queryKey: ["article", boardId],
    queryFn: () => getArticle(boardId as string),
    staleTime: Infinity,
  });

  console.log(ArticleData);

  return <div>{ArticleData?.content}</div>;
}
