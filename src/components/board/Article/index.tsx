import { Article } from "@coworkers-types";
import Dropdown from "@components/commons/Dropdown";
import Input from "@components/commons/Input";
import Label from "@components/commons/Label";
import ArticleCard from "./ArticleCard";

export default function ArticleSection({
  Posts,
  searchValue,
  searchChange,
  onEnter,
  sortValue,
  sortChange,
}: {
  Posts: Article[];
  searchValue: string;
  searchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEnter: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  sortValue: string;
  sortChange: (value: string) => void;
}) {
  return (
    <div className="mt-30">
      <div className="mb-12 flex w-full items-center justify-between gap-30">
        <Label content="게시글" className="w-100" />
        <Input
          value={searchValue}
          onChange={searchChange}
          onKeyDown={onEnter}
          type="search"
          name="search"
          placeholder="검색할 게시글을 입력해주세요."
          className="flex w-600 items-center justify-center"
        />
        <Dropdown selectedValue={sortValue} onSelect={(value) => sortChange(value)}>
          <Dropdown.Toggle>최신순</Dropdown.Toggle>
          <Dropdown.Wrapper>
            <Dropdown.Item value="recent">최신순</Dropdown.Item>
            <Dropdown.Item value="like">좋아요순</Dropdown.Item>
          </Dropdown.Wrapper>
        </Dropdown>
      </div>
      <div className="mt-20 flex flex-col">
        {Posts.map((post) => (
          <div key={post.id}>
            <ArticleCard Posts={post} />
          </div>
        ))}
      </div>
    </div>
  );
}
