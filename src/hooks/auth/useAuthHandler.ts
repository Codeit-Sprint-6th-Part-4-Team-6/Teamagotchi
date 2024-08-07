import { LoginRequest, SignUpRequest } from "@coworkers-types";
import { useRouter } from "next/router";
import { useAuthStore } from "@store/useAuthStore";
import { setAuth } from "@utils/auth";
import { loginUser, signUpUser } from "@api/authApi";

type AuthRequest = SignUpRequest | LoginRequest;

/**
 * 회원가입/로그인 시 api 요청을 하는 hook입니다.
 * @param values 필요한 폼 데이터를 매개변수로 받습니다.
 * @param isRegister 회원가입인지 아닌지 boolean 형태로 알 수 있습니다.
 * @returns submit 버튼에 넘길 수 있는 핸들러가 반환됩니다.
 */
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
