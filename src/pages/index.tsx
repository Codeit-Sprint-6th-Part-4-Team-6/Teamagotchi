import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import CommentSection from "@components/board/ArticleDetail/CommentSection";
import Comment from "@components/commons/Comment";
import Dropdown from "@components/commons/Dropdown";
import Input from "@components/commons/Input";
import EditDeletePopover from "@components/commons/Popover/EditDeletePopover";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const comment = {
    user: {
      teamId: "string",
      image:
        "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/82/9791191214376.jpg",
      nickname: "이미서있는임희서",
      updatedAt: "2024-08-02T11:47:46.644Z",
      createdAt: "2024-08-02T11:47:46.644Z",
      encryptedPassword: "string",
      email: "string",
      id: 0,
    },
    userId: 0,
    taskId: 0,
    updatedAt: "2024-08-02T11:47:46.644Z",
    createdAt: "2024-08-02T11:47:46.644Z",
    content:
      "법인 설립 서비스 관련 링크 첨부 드려요법인 설립 서비스 관련 링크 첨부 드려요법인 설립 서비스 관련 링크 첨부 드려요법인 설립 서비스관련 링크 첨부 드려요\nhttps://www.codeit.kr 하진짜 빡치긴하네요\n하하하하",
    id: 0,
  };

  const [repeatValue, setRepeatValue] = useState<string>("");
  const [sortValue, setSortValue] = useState<string>("latest");

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div />;
  }
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24 dark:bg-background-primary">
        <button
          type="button"
          className="rounded border bg-gradient-to-r from-brand-gradient-start to-brand-gradient-end p-[5px]"
          onClick={() => {
            setTheme(theme === "light" ? "dark" : "light");
          }}
        >
          {theme === "light" ? "light" : "dark"}
        </button>
        <p className="font-bold">
          This is Main this is pretendard hahaha <br />
          안녕하세요 한글 폰트는 어떨까요?
        </p>
        <p className="text-4xl font-bold text-brand-primary hover:bg-interaction-hover">bold</p>
        <p className="text-3xl font-bold text-brand-primary">bold</p>
        <p className="text-2xl font-bold text-brand-primary">bold</p>
        <p className="text-xl font-bold text-brand-primary">bold</p>
        <Input name="test" placeholder="일반 test입니다" />
        <Input type="password" name="test" placeholder="password test입니다" />
        <Input type="search" name="test" placeholder="search test입니다" />
        <Input
          type="search"
          name="test"
          value="testing"
          placeholder="search x button render test입니다"
        />
        <Input name="test" placeholder="error test입니다" errorMessage="testing" />
        {/* <Textarea type="innerButton" placeholder="댓글을 달아주세요" height={50} />
      <Textarea type="small" placeholder="댓글을 달아주세요" height={74} />
      <Textarea type="big" placeholder="댓글을 달아주세요" height={104} /> */}
        <Comment type="article" comment={comment} />
        {/* <Textarea type="big" placeholder="댓글을 달아주세요" height={104} /> */}
        <div className="flex h-[20vh] gap-20">
          <EditDeletePopover icon="gear" handleModify={() => {}} handleDelete={() => {}} />
          <EditDeletePopover icon="kebabLarge" handleModify={() => {}} handleDelete={() => {}} />
          <EditDeletePopover icon="kebabSmall" handleModify={() => {}} handleDelete={() => {}} />

          <Dropdown selectedValue={repeatValue} onSelect={(value) => setRepeatValue(value)}>
            <Dropdown.Toggle>반복 안함</Dropdown.Toggle>
            <Dropdown.Wrapper>
              <Dropdown.Item value="">반복 안함</Dropdown.Item>
              <Dropdown.Item value="ONCE">한 번</Dropdown.Item>
              <Dropdown.Item value="DAILY">매일</Dropdown.Item>
              <Dropdown.Item value="WEEKLY">주 반복</Dropdown.Item>
              <Dropdown.Item value="MONTHLY">월 반복</Dropdown.Item>
            </Dropdown.Wrapper>
          </Dropdown>

          <Dropdown selectedValue={sortValue} onSelect={(value) => setSortValue(value)}>
            <Dropdown.Toggle>최신순</Dropdown.Toggle>
            <Dropdown.Wrapper>
              <Dropdown.Item value="latest">최신순</Dropdown.Item>
              <Dropdown.Item value="oldest">오래된순</Dropdown.Item>
              <Dropdown.Item value="likes">좋아요 많은순</Dropdown.Item>
            </Dropdown.Wrapper>
          </Dropdown>
        </div>
      </main>
      <div className="my-30">
        <CommentSection boardId={13} />
      </div>
    </>
  );
}
