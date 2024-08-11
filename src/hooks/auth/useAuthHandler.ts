import { AuthResponse, LoginRequest, SignUpRequest } from "@coworkers-types";
import { useMutation } from "@tanstack/react-query";
import { loginUser, signUpUser } from "@api/authApi";
import { useAuth } from "./useAuth";

type AuthRequest = SignUpRequest | LoginRequest;

/**
 * 회원가입/로그인 시 api 요청을 하는 hook입니다.
 * @param values 필요한 폼 데이터를 매개변수로 받습니다.
 * @param isRegister 회원가입인지 아닌지 boolean 형태로 알 수 있습니다.
 * @returns submit 버튼에 넘길 수 있는 핸들러가 반환됩니다.
 */
export const useAuthHandler = <T extends AuthRequest>(values: T, isRegister: boolean = false) => {
  const { login } = useAuth();

  const loginMutation = useMutation({
    mutationFn: (loginValue: LoginRequest) => loginUser(loginValue),
    onSuccess: (data: AuthResponse) => {
      // TODO: 토스트
      login(data);
    },
    onError: (error: any) => {
      // TODO: 토스트?
      alert(error.response.data.message);
    },
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (isRegister) {
      try {
        await signUpUser(values as SignUpRequest);
      } catch (error: any) {
        // TODO: 토스트
        alert(error.response.data.message);
      }
    }

    const loginData = {
      email: values.email,
      password: values.password,
    };

    loginMutation.mutate(loginData);
  };

  return {
    handleSubmit,
  };
};
