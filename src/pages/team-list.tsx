import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuthStore } from "@store/useAuthStore";
import { clearAuth } from "@utils/auth";
import { getUser } from "./api/userApi";

// NOTE: 리다이렉트, 토큰 재생성 등을 위한 팀 리스트 페이지이므로 컴포넌트 내의 구현은 테스트를 위한 코드입니다.
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
    </div>
  );
}
