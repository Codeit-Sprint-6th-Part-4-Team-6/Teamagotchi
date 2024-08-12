import {
  Article,
  ArticleDetails,
  Message,
  PostArticleRequest,
  TotalArticle,
} from "@coworkers-types";
import { axiosInstance } from "./axios";

/**
 * 게시글을 작성하는 API 함수입니다.
 * @param data - article의 { image, content, title } 객체를 전송해주세요
 * @returns 게시글 객체를 반환합니다.
 */
export const postArticle = async (data: PostArticleRequest): Promise<Article> => {
  const response = await axiosInstance.post<Article>("articles", data);
  return response.data;
};

/**
 * 게시글 목록을 조회하는 API 함수입니다.
 * @param page - 페이지 번호 Default value : 1
 * @param pageSize - 페이지 당 게시글 수 Default value : 10
 * @param orderBy - 정렬 기준 Default value : recent / Available values : recent, like
 * @param keyword - 검색 키워드
 * @returns 게시글 객체를 반환합니다.
 */
export const getArticleList = async (
  page = 1,
  pageSize = 3,
  orderBy: string = "recent",
  keyword = ""
): Promise<TotalArticle> => {
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
    orderBy,
    keyword,
  });
  const response = await axiosInstance.get<TotalArticle>(`articles?${params}`);
  return response.data;
};

/**
 * 게시글 상세 조회하는 API 함수입니다.
 * @param articleId - article의 ID입니다.
 * @returns 게시글 객체를 반환합니다. 오류 발생시 메세지 객체를 반환합니다.
 */
export const getArticle = async (articleId: number): Promise<ArticleDetails | Message> => {
  const response = await axiosInstance.get<ArticleDetails | Message>(`articles/${articleId}`);
  return response.data;
};

/**
 * 게시글을 수정하는 API 함수입니다.
 * @param articleId - article의 ID입니다.
 * @param data - article의 { image, content, title } 객체를 전송해주세요
 * @returns 게시글 상세보기 객체를 반환합니다.
 */
export const patchArticle = async (
  articleId: number,
  data: PostArticleRequest
): Promise<ArticleDetails | Message> => {
  const response = await axiosInstance.patch<ArticleDetails | Message>(
    `articles/${articleId}`,
    data
  );
  return response.data;
};

/**
 * 게시글 삭제하는 API 함수입니다.
 * @param articleId - article의 ID입니다.
 * @returns id를 반환합니다. 오류 발생시 메세지 객체를 반환합니다.
 */
export const deleteArticle = async (articleId: number): Promise<number | Message> => {
  const response = await axiosInstance.delete<number | Message>(`articles/${articleId}`);
  return response.data;
};

/**
 * 게시글 좋아요를 전송하는 API 함수입니다.
 * @param articleId - article의 ID입니다.
 * @returns 게시글 상세보기 객체를 반환합니다. 오류 발생시 메세지 객체를 반환합니다.
 */
export const postArticleLike = async (articleId: number): Promise<ArticleDetails | Message> => {
  const response = await axiosInstance.post<ArticleDetails | Message>(`articles/${articleId}/like`);
  return response.data;
};

/**
 * 게시글 좋아요를 취소하는 API 함수입니다.
 * @param articleId - article의 ID입니다.
 * @returns 게시글 상세보기 객체를 반환합니다. 오류 발생시 메세지 객체를 반환합니다.
 */
export const deleteArticleLike = async (articleId: number): Promise<ArticleDetails | Message> => {
  const response = await axiosInstance.delete<ArticleDetails | Message>(
    `articles/${articleId}/like`
  );
  return response.data;
};
