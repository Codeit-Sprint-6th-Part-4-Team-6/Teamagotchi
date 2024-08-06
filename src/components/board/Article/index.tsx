import Label from "@components/commons/Label";
import ArticleCard from "./ArticleCard";

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

export default function Article({ Posts }: { Posts: List[] }) {
  return (
    <div className="mt-30">
      <div className="mb-12 flex items-center justify-between">
        <Label content="게시글" />
        {/* 검색부분 */}
        {/* 정렬 */}
      </div>
      <div className="flex flex-col">
        {Posts.map((post) => (
          <div key={post.id}>
            <ArticleCard Posts={post} />
          </div>
        ))}
      </div>
    </div>
  );
}
