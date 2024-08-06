import {
  GroupInfo,
  History,
  Message,
  ResetPassword,
  SendResetPasswordRequest,
  User,
  UserRequest,
} from "@coworkers-types";
import { axiosInstance } from "./axios";

/**
 * 유저 정보를 조회하는 API 함수입니다.
 * @returns 유저 정보 객체를 반환합니다.
 */
export const getUser = async (): Promise<User> => {
  const response = await axiosInstance.get<User>("user");
  return response.data;
};

/**
 * 유저 정보를 수정하는 API 함수입니다.
 * @param data 데이터로 { nickname, image } 객체를 받습니다.
 * @returns 완료 시 메세지를 받습니다.
 */
export const patchUser = async (data: UserRequest): Promise<Message> => {
  const response = await axiosInstance.patch<Message>("user", data);
  return response.data;
};

/**
 * 현재 로그인된 유저를 탈퇴시키는 API 함수입니다.
 * @returns 완료 시 204 코드를 받고, 응답 본문은 없습니다.
 */
export const deleteUser = async (): Promise<void> => {
  await axiosInstance.delete("user");
};

/**
 * 유저의 그룹 정보를 조회하는 API 함수입니다.
 * @returns 그룹 정보 배열을 반환합니다.
 */
export const getUserGroups = async (): Promise<GroupInfo[]> => {
  const response = await axiosInstance.get<GroupInfo[]>("user/groups");
  return response.data;
};

/**
 * 유저의 마이 히스토리를 조회하는 API 함수입니다.
 * @returns 그룹 정보 배열을 반환합니다.
 */
export const getUserHistory = async (): Promise<History> => {
  const response = await axiosInstance.get<History>("user/history");
  return response.data;
};

/**
 * 비밀번호 재설정 이메일을 전송하는 API 함수입니다.
 * {redirectUrl}/reset-password?token=${token}로 이동할 수 있는 링크를 이메일로 전송합니다.
 * e.g. "https://coworkers.vercel.app/reset-password?token=1234567890"
 * @param  data 데이터로 `{ email, redirectUrl }`을 받습니다.
 * @returns 완료 시 메세지를 반환합니다.
 */
export const postSendResetPasswordEmail = async (
  data: SendResetPasswordRequest
): Promise<Message> => {
  const response = await axiosInstance.post<Message>("user/send-reset-password-email", data);
  return response.data;
};

/**
 * 이메일로 전달받은 링크에서 비밀번호 초기화하는 API 함수입니다.
 * POST 요청으로 발송한 메일의 링크에 담긴 토큰을 사용해야 합니다.
 * @param  data 데이터로 { passwordConfirmation, password, token }을 받습니다.
 * @returns 완료 시 메세지를 반환합니다.
 */
export const postResetPassword = async (data: ResetPassword): Promise<Message> => {
  const response = await axiosInstance.patch<Message>("user/reset-password", data);
  return response.data;
};

/**
 * 비밀번호를 변경하는 API 함수입니다.
 * @param  data 데이터로 { passwordConfirmation, password }을 받습니다.
 * @returns 완료 시 메세지를 반환합니다.
 */
export const patchResetPassword = async (data: ResetPassword): Promise<Message> => {
  const response = await axiosInstance.post<Message>("user/password", data);
  return response.data;
};
