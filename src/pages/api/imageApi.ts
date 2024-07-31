import { ImageURL } from "@coworkers-types";
import { axiosInstance } from "./axios";

/**
 * 이미지 파일을 URL로 변환해주는 API 함수입니다.
 * @param image - 이미지 파일
 * @returns 이미지 URL을 반환합니다.
 */
export const postImageURL = async (image: File | string): Promise<ImageURL> => {
  const formData = new FormData();
  formData.append("image", image);

  const response = await axiosInstance.post<ImageURL>("images/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
