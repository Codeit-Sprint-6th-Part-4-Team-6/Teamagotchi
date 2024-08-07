import { SignUpRequest } from "@coworkers-types";
import { useRouter } from "next/router";
import { useAuthStore } from "@store/useAuthStore";
import { setAuth } from "@utils/auth";
import { loginUser, signUpUser } from "../../api/authApi";

export const useRegisterHandler = (values: SignUpRequest) => {
  const router = useRouter();
  const { setUser } = useAuthStore();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    await signUpUser(values);

    const loginData = {
      email: values.email,
      password: values.password,
    };

    const data = await loginUser(loginData);
    setAuth(data);
    setUser(data.user);
    router.push("/team-list");
  };

  return {
    handleSubmit,
  };
};
