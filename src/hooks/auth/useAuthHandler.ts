import { LoginRequest, SignUpRequest } from "@coworkers-types";
import { useRouter } from "next/router";
import { useAuthStore } from "@store/useAuthStore";
import { setAuth } from "@utils/auth";
import { loginUser, signUpUser } from "../../pages/api/authApi";

type AuthRequest = SignUpRequest | LoginRequest;

export const useAuthHandler = <T extends AuthRequest>(values: T, isRegister: boolean = false) => {
  const router = useRouter();
  const { setUser } = useAuthStore();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    let data;

    if (isRegister) {
      await signUpUser(values as SignUpRequest);

      const loginData = {
        email: (values as SignUpRequest).email,
        password: (values as SignUpRequest).password,
      };

      data = await loginUser(loginData);
    } else {
      data = await loginUser(values as LoginRequest);
    }
    setAuth(data);
    setUser(data.user);
    router.push("/team");
  };

  return {
    handleSubmit,
  };
};
