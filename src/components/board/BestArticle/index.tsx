import Label from "@components/commons/Label";
import BestArticleCard from "./BestArticlesCard";

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

export default function BestArticle({ Posts }: { Posts: List[] }) {
  return (
    <div className="mx-0 my-auto flex flex-col gap-24">
      <Label content="베스트 게시글" />
      <div className="flex gap-24">
        {Posts.map((item) => (
          <BestArticleCard item={item} />
        ))}
      </div>
    </div>
  );
}
