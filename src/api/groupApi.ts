import { DateTask, Group, GroupInfo, Message, NewGroup, Profile } from "@coworkers-types";
import { axiosInstance } from "./axios";

/**
 * 팀 페이지의 그룹을 조회하는 API 함수입니다.
 * @param groupId - group의 ID입니다.
 * @returns Group 객체를 반환합니다.
 */
export const getGroup = async (groupId: number): Promise<Group> => {
  const response = await axiosInstance.get<Group>(`groups/${groupId}`);
  return response.data;
};

/**
 * 팀 페이지의 그룹 이름과 이미지를 수정하는 API 함수입니다.
 * @param groupId - group의 ID입니다.
 * @param data - {image, name} 을 전송합니다.
 * @returns 수정된 Group 객체를 반환합니다.
 */
export const patchGroupProfile = async (groupId: number, data: Profile): Promise<GroupInfo> => {
  const response = await axiosInstance.patch<GroupInfo>(`groups/${groupId}`, data);
  return response.data;
};

/**
 * 팀 페이지의 그룹을 삭제하는 API 함수입니다.
 * @param groupId - group의 ID입니다.
 * @returns 완료 시 204 코드를 받고, 응답 본문은 없습니다.
 */
export const deleteGroup = async (groupId: number): Promise<void> => {
  await axiosInstance.delete<Group>(`groups/${groupId}`);
};

/**
 * 팀 페이지 그룹을 생성하는 API 함수입니다.
 * @param name - 팀 페이지 그룹명
 * @param image - 팀 페이지 그룹 사진
 * @returns 수정된 Group 객체를 반환합니다. 오류 발생시 에러 메세지 객체를 반환합니다.
 */
export const postGroup = async (
  name: string,
  image?: string | null
): Promise<NewGroup | Message> => {
  const response = await axiosInstance.post<NewGroup | Message>("groups", {
    image,
    name,
  });
  return response.data;
};

/**
 * 그룹 멤버로 가입된 유저의 정보를 조회하는 API 함수입니다.
 * @param groupId - group의 ID입니다.
 * @param memberUserId - 그룹 멤버 유저의 ID입니다.
 * @returns 유저 정보 객체를 받아옵니다.
 */
export const getGroupMember = async (groupId: number, memberUserId: number): Promise<GroupInfo> => {
  const response = await axiosInstance.get<GroupInfo>(`groups/${groupId}/member/${memberUserId}`);
  return response.data;
};

/**
 * 그룹 멤버로 가입된 유저를 삭제하는 API 함수입니다.
 * @param groupId - group의 ID입니다.
 * @param memberUserId - 멤버 ID입니다.
 * @returns 완료 시 204 코드를 받고, 응답 본문은 없습니다.
 */
export const deleteGroupMember = async (groupId: number, memberUserId: number): Promise<void> => {
  await axiosInstance.delete(`groups/${groupId}/member/${memberUserId}`);
};

/**
 * 그룹 멤버로 초대하는 링크용 토큰을 생성하는 API 함수입니다.
 * @param groupId - group의 ID입니다.
 * @returns 초대 링크용 토큰값이 옵니다.
 */
export const getInvitationToken = async (groupId: number): Promise<string> => {
  const response = await axiosInstance.get<string>(`/groups/${groupId}/invitation`);
  return response.data;
};

/**
 * 그룹 멤버로 초대를 수락하는 API 함수입니다.
 * @param userEmail - 초대를 수락하는 유저의 이메일
 * @param token - 초대 링크에 포함되어있는 토큰
 * @returns 완료 시 204 코드를 받고, 응답 본문은 없습니다.
 */
export const postAcceptInvitation = async (userEmail: string, token: string): Promise<void> => {
  await axiosInstance.post(`/groups/accept-invitation`, {
    userEmail,
    token,
  });
};

/**
 * 초대 링크없이 그룹에 유저를 추가하는 API 함수입니다.
 * @param groupId - group의 ID입니다.
 * @param userEmail - 초대를 수락하는 유저의 이메일
 * @returns 완료 시 204 코드를 받고, 응답 본문은 없습니다.
 */
export const postInvitationWithoutLink = async (
  userEmail: string,
  groupId: number
): Promise<void> => {
  await axiosInstance.post(`/groups/${groupId}/member`, {
    userEmail,
  });
};

/**
 * 특정 일자, 특정 할일 리스트의 할일을 조회하는 API 함수입니다.
 * @param groupId - group의 ID입니다.
 * @param date - 2021-01-01T00:00:00Z 형식의 날짜를 받습니다.
 * @returns Group 객체를 반환합니다.
 */
export const getDateTasks = async (groupId: number, date: string): Promise<DateTask[]> => {
  const params = new URLSearchParams(`date=${date}`);

  const response = await axiosInstance.get<DateTask[]>(`/groups/${groupId}/tasks?${params}`);
  return response.data;
};
