import {
  AccessToken,
  AuthResponse,
  LoginRequest,
  RefreshToken,
  SignUpRequest,
  SocialLoginAppRegister,
  SocialLoginAppResponse,
  SocialLoginRequest,
} from "@coworkers-types";
import { axiosInstance } from "./axios";

/**
 * 회원가입 API 함수입니다.
 * @param data { email, nickname, password, passwordConfirmation }를 객체로 담아서 전송합니다.
 * @returns 유저 정보 AuthResponse를 반환합니다.
 */
export const signUpUser = async (data: SignUpRequest): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>("auth/signUp", data);
  return response.data;
};

/**
 * 로그인 API 함수입니다.
 * @param data { email, password } 를 객체로 담아서 전송합니다.
 * @returns 유저 정보 AuthResponse를 반환합니다.
 */
export const loginUser = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>("auth/signIn", data);
  return response.data;
};

/**
 * 리프레쉬토큰을 전송하여 새로운 엑세스토큰을 받는 API 함수입니다.
 * @param refreshToken 을 전송합니다.
 * @returns accessToken을 반환합니다.
 */
export const postRefreshToken = async (refreshToken: RefreshToken): Promise<AccessToken> => {
  const response = await axiosInstance.post<AccessToken>("auth/refresh-token", refreshToken);
  return response.data;
};

/**
 * 소셜로그인 API 함수입니다. 가입되어있지 않을 경우 가입됩니다.
 * @param provider - 소셜 로그인 제공자 (예: 'google', 'facebook')
 * @param data - 소셜 로그인 요청 데이터 {state, redirectUri, token}
 * @returns accessToken을 반환합니다.
 */
export const socialLogin = async (
  provider: string,
  data: SocialLoginRequest
): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>(`auth/signIn/${provider}`, data);
  return response.data;
};

/**
 * 소셜로그인 APP 등록 함수입니다. 구글 / 카카오 간편 로그인을 위한 App을 등록하거나 수정합니다.
 * @param data - 소셜 로그인 등록 데이터 {appSecret, appKey, provider}
 * @returns accessToken을 반환합니다.
 */
export const postOauthApps = async (
  data: SocialLoginAppRegister
): Promise<SocialLoginAppResponse> => {
  const response = await axiosInstance.post<SocialLoginAppResponse>(`oauthApps`, data);
  return response.data;
};
