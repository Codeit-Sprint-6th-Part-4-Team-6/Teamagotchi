import { LoginRequest } from "@coworkers-types";
import { useRouter } from "next/router";
import { useAuthStore } from "@store/useAuthStore";
import { setAuth } from "@utils/auth";
import { loginUser } from "../../pages/api/authApi";

export const useLoginHandler = (values: LoginRequest) => {
  const router = useRouter();
  const { setUser } = useAuthStore();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const data = await loginUser(values);
    setAuth(data);
    setUser(data.user);
    router.push("/team-list");
  }

  return {
    handleSubmit,
  };
};
