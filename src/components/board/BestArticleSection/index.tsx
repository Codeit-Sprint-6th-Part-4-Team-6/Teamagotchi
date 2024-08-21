import { Article } from "@coworkers-types";
import Label from "@components/commons/Label";
import BestArticleCard from "./BestArticlesCard";

export default function BestArticleSection({ Posts }: { Posts: Article[] }) {
  return (
    <div className="mx-0 my-auto mt-30 flex w-full flex-col gap-12">
      <Label content="베스트 게시글" />
      <div className="flex gap-24">
        {Posts.map((item) => (
          <BestArticleCard item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}
