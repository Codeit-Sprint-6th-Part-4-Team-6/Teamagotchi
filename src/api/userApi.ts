import {
  History,
  Membership,
  Message,
  Password,
  ResetPassword,
  SendResetPasswordRequest,
  TaskDone,
  User,
  UserGroup,
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
export const getUserGroups = async (): Promise<UserGroup[]> => {
  const response = await axiosInstance.get<UserGroup[]>("user/groups");
  return response.data;
};

/**
 * 유저의 그룹 정보를 조회하는 API 함수입니다.
 * @returns 그룹 정보 배열을 반환합니다.
 */
export const getUserMemberships = async (): Promise<Membership[]> => {
  const response = await axiosInstance.get<Membership[]>("user/memberships");
  return response.data;
};

/**
 * 유저의 마이 히스토리를 조회하는 API 함수입니다.
 * @returns 그룹 정보 배열을 반환합니다.
 */
export const getUserHistory = async (): Promise<TaskDone[][]> => {
  const response = await axiosInstance.get<History>("user/history");

  if (response.data[0].tasksDone.length === 0) return [];

  const groupHistory = (history: History) => {
    const groupedTasks: Record<string, TaskDone[]> = {};

    history[0].tasksDone.forEach((doneTask) => {
      const date = new Date(doneTask.doneAt).toLocaleDateString(); // 날짜만 추출

      if (!groupedTasks[date]) {
        groupedTasks[date] = []; // 해당 날짜 그룹이 없으면 초기화
      }

      groupedTasks[date].push(doneTask); // 해당 날짜에 task 추가
    });

    return Object.values(groupedTasks).reverse(); // 2차원 배열로 반환(순서 반대로)
  };

  const history = groupHistory(response.data);

  return history;
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
export const patchResetPassword = async (data: Password): Promise<Message> => {
  const response = await axiosInstance.patch<Message>("user/password", data);
  return response.data;
};
