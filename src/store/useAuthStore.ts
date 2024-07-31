import { UserInfo } from "@coworkers-types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface AuthState {
  user: UserInfo | null;
}

interface AuthAction {
  setUser: (user: UserInfo) => void;
}

/**
 * 사용자 정보를 전역상태로 관리하는 zustand 훅
 * user : 유저 정보 상태
 * setUser : 유저 정보 변경 함수
 */
export const useAuthStore = create<AuthState & AuthAction>()(
  devtools((set) => ({
    user: null,
    setUser: (user: UserInfo) => {
      set({ user });
    },
  }))
);