import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ArticleCommentList from "@components/board-details/ArticleCommentList";
import TaskCommentList from "@components/task-list/TaskCommentList";
import { useAuthStore } from "@store/useAuthStore";
import { clearAuth } from "@utils/auth";
import { getUser } from "@api/userApi";

export default function TeamListPage() {
  const [testData, setTestData] = useState<string>();
  const { setUser } = useAuthStore();
  const router = useRouter();

  const getData = async () => {
    const data = await getUser();
    setTestData(data.nickname);
  };

  const handleSignOut = (): void => {
    alert("로그아웃 되었습니다.");
    setUser(null);
    clearAuth();
    router.push("/login");
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="text-white">
      <div>{testData}</div>
      <div>{testData}</div>
      <div>{testData}</div>
      <button type="button" onClick={handleSignOut}>
        로그아웃
      </button>
      <div className="w-1000">
        <TaskCommentList taskId={30} />
      </div>
      <div className="w-1000">
        <ArticleCommentList articleId={3} />
      </div>
    </div>
  );
}
