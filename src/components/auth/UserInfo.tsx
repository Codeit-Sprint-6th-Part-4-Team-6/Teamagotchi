import { BaseUserInfo } from "@coworkers-types";
import { useQueryClient } from "@tanstack/react-query";

type LocalStorageData = {
  state: {
    user: BaseUserInfo;
    isLoggedIn: boolean;
  };
  version: number;
};

export default function UserInfo() {
  const queryClient = useQueryClient();

  const getUserToLocalStorage = () => {
    const result = localStorage.getItem("userStore");

    if (result) {
      try {
        const data: LocalStorageData = JSON.parse(result);
        return data?.state.user;
      } catch (error) {
        console.error("Error parsing JSON from localStorage:", error);
        return null;
      }
    }
    return null;
  };

  queryClient.setQueryData(["user"], () => getUserToLocalStorage);

  return <div />;
}
