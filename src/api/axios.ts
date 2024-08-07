import { AccessToken } from "@coworkers-types";
import axios, { AxiosRequestHeaders, InternalAxiosRequestConfig } from "axios";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

export const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const newConfig = config;
    const accessToken = getCookie("accessToken");
    if (accessToken) {
      newConfig.headers = config.headers || {};
      (newConfig.headers as AxiosRequestHeaders).Authorization = `Bearer ${accessToken}`;
    }
    return newConfig;
  },
  (error) => Promise.reject(error)
);

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// NOTE: eslint 에러가 발생하는 인터셉터
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;
    const refreshToken = getCookie("refreshToken");
    /* eslint-disable no-underscore-dangle */
    if (error.response?.status === 401 && !originalRequest._retry) {
      /* eslint-disable no-underscore-dangle */
      originalRequest._retry = true;
      try {
        const response = await axiosInstance.post<AccessToken>("auth/refresh-token", {
          refreshToken,
        });
        setCookie("accessToken", response.data.accessToken, { maxAge: 3600 });
        return await axiosInstance(originalRequest);
      } catch (refreshError) {
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
      }
    }
    return Promise.reject(error);
  }
);
