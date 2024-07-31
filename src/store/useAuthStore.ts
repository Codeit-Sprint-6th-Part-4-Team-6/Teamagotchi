import { UserInfo } from "@coworkers-types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface UserState {
  user: UserInfo | null;
}

interface UserAction {
  setUser: (user: UserInfo) => void;
}

export const useUserStore = create<UserState & UserAction>()(
  devtools((set) => ({
    user: null,
    setUser: (user: UserInfo) => {
      set({ user });
    },
  }))
);
