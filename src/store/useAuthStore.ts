import { UserInfo } from "@coworkers-types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AuthState {
  isLoggedIn: boolean;
  user: UserInfo | null;
}

interface AuthAction {
  setIsLoggedIn: (value: boolean) => void;
  setUser: (user: UserInfo | null) => void;
}

/**
 * 로그인 여부를 전역상태로 관리하는 zustand 훅
 * isLoggedIn : 로그인 상태
 * setIsLoggedIn : 로그인 상태 변경 함수
 */
export const useAuthStore = create<AuthState & AuthAction>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isLoggedIn: false,
        setIsLoggedIn: (value) => set({ isLoggedIn: value }),
        setUser: (user: UserInfo | null) => {
          set({ user });
        },
      }),
      {
        name: "userStore",
      }
    )
  )
);
