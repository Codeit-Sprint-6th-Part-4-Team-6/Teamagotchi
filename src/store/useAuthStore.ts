import { UserInfo } from "@coworkers-types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface AuthState {
  user: UserInfo | null;
}

interface AuthAction {
  setUser: (user: UserInfo) => void;
}

export const useAuthStore = create<AuthState & AuthAction>()(
  devtools((set) => ({
    user: null,
    setUser: (user: UserInfo) => {
      set({ user });
    },
  }))
);
