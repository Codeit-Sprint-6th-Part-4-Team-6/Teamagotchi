declare module '@coworkers-types' {
  export type SignUpRequest = {
    email: string;
    nickname: string;
    password: string;
    passwordConfirmation: string;
  };

  export type AuthResponse = {
    accessToken: string;
    refreshToken: string;
    user: UserInfo;
  };

  export type UserInfo = {
    id: number;
    email: string;
    nickname: string;
    updatedAt: string;
    createdAt: string;
    image: null;
    teamId: string;
  };

  export type LoginRequest = {
    email: string;
    password: string;
  };

  export type RefreshToken = {
    refreshToken: string;
  };

  export type AccessToken = {
    accessToken: string;
  };

  export type SocialLoginRequest = {
    state: string;
    redirectUri: string;
    token: string;
  };

  export type SocialLoginAppRegister = {
    appSecret: string;
    appKey: string;
    provider: string;
  };

  export type SocialLoginAppResponse = {
    createdAt: string;
    updatedAt: string;
    appSecret: string;
    appKey: string;
    provider: string;
    teamId: string;
    id: number;
  };
}
