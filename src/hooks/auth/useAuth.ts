import { AuthResponse } from "@coworkers-types";
import { useQueryClient } from "@tanstack/react-query";
import { deleteCookie, hasCookie, setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useToast } from "@hooks/useToast";
import { useAuthStore } from "@store/useAuthStore";
import { getUser } from "@api/userApi";

export const useAuth = () => {
  const { setUser, setIsLoggedIn } = useAuthStore();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  /**
   * 로그인 시 필요한 처리를 모아놓은 함수
   * @param data 로그인 시 응답 값
   */
  const login = (data: AuthResponse) => {
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
    router.push("/teams");
  };

  /**
   * 로그아웃 시 처리할 로직을 모아놓은 함수
   */
  const logout = () => {
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    deleteCookie("loginType");
    queryClient.removeQueries();
    setUser(null);
    useAuthStore.persist.clearStorage();
    setIsLoggedIn(false);
    router.push("/");
  };

  const setUserData = async () => {
    const localData = localStorage.getItem("userStore") ?? "";
    const hasToken = hasCookie("refreshToken");

    if (hasToken) {
      const { user } = JSON.parse(localData).state;
      if (user) {
        setUser(user);
        queryClient.setQueryData(["user"], user);
      } else {
        const data = await getUser();
        setUser(data);
        queryClient.setQueryData(["user"], data);
      }
    } else {
      toast("danger", "로그인 된 사용자만 이용이 가능합니다.");
      router.push("/login");
    }
  };

  return { login, logout, setUserData };
};
