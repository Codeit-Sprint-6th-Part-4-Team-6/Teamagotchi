import { User } from "@coworkers-types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
}

interface AuthAction {
  setUser: (user: User | null) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

/**
 * 로그인 여부를 전역상태로 관리하는 zustand 훅
 * user : 유저 정보
 * setUser : 유저 정보 상태 변경
 */
export const useAuthStore = create<AuthState & AuthAction>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isLoggedIn: false,
        setUser: (user: User | null) => {
          set({ user });
        },
        setIsLoggedIn: (isLoggedIn: boolean) => {
          set({ isLoggedIn });
        },
      }),
      {
        name: "userStore",
      }
    )
  )
);
