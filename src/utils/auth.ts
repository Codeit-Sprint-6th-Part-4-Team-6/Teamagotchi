import { AuthResponse } from "@coworkers-types";
import { deleteCookie, setCookie } from "cookies-next";
import { useAuthStore } from "@store/useAuthStore";

// NOTE: 해당 파일에는 유저 기능과 관련된 추가적인 연산 로직들이 필요시에 저장될 예정입니다.

/**
 * 회원가입, 로그인 페이지에서 POST api 요청 시 응답받은 토큰을 유효 시간과 함께 쿠키에 저장하는 함수
 * @param data 로그인 요청 후 응답으로 오는 데이터 타입
 */
export const setAuth = (data: AuthResponse) => {
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
};

export const clearAuth = () => {
  useAuthStore.persist.clearStorage();
  deleteCookie("accessToken");
  deleteCookie("refreshToken");
  deleteCookie("loginType");
};
