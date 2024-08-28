import { AuthResponse, User } from "@coworkers-types";
import { useQueryClient } from "@tanstack/react-query";
import { deleteCookie, setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useAuthStore } from "@store/useAuthStore";
import { getUser } from "@api/userApi";

export const useAuth = () => {
  const { setUser, setIsLoggedIn, isLoggedIn } = useAuthStore();
  const router = useRouter();
  const queryClient = useQueryClient();

  /**
   * 로그인 시 필요한 처리를 모아놓은 함수
   * @param data 로그인 시 응답 값
   */
  const login = async (data: AuthResponse) => {
    setCookie("accessToken", data.accessToken, { maxAge: 3600 });
    setCookie("refreshToken", data.refreshToken, { maxAge: 3600 * 12 * 7 });
    // 이메일 형식에 따라 userType 쿠키 설정
    let loginType = "USER";
    if (data.user.email.toLowerCase().endsWith("@kakao.com")) {
      loginType = "KAKAO";
    } else if (data.user.email.toLowerCase().endsWith("@gmail.com")) {
      loginType = "GOOGLE";
    }
    setCookie("loginType", loginType, { maxAge: 3600 * 12 * 7 });
    setIsLoggedIn(true);
    const userInfo = await getUser();
    setUser(userInfo);
    router.push("/teams");
  };

  /**
   * 로그아웃 시 처리할 로직을 모아놓은 함수
   */
  const logout = async () => {
    // 쿠키 삭제 및 상태 초기화
    deleteCookie("refreshToken");
    deleteCookie("accessToken");
    deleteCookie("loginType");

    setUser(null);
    setIsLoggedIn(false);

    // 모든 React Query 캐시를 무효화
    queryClient.removeQueries();

    // 쿠키가 안전하게 삭제되었는지 확인 후 리디렉션
    await router.push("/");

    // 미들웨어의 판단이 달라지기 전에 강제로 페이지를 새로고침
    window.location.reload();
  };

  const setUserData = (data: User) => {
    if (isLoggedIn) {
      setUser(data);
      setIsLoggedIn(true);
    }
  };

  return { login, logout, setUserData };
};
