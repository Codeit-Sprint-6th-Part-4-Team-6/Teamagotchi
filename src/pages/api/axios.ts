import axios, { AxiosRequestHeaders, InternalAxiosRequestConfig } from "axios";
import { getCookie } from "cookies-next";

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

// interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
//   _retry?: boolean;
// }

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config as CustomAxiosRequestConfig;
//     const refreshToken = getCookie("refreshToken");
//     const requestType: RefreshToken = { refreshToken: String(refreshToken) };
//     /* eslint-disable no-underscore-dangle */
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       /* eslint-disable no-underscore-dangle */
//       originalRequest._retry = true;
//       try {
//         const data = await postRefreshToken(requestType);
//         setCookie("accessToken", data.accessToken, { maxAge: 3600 });
//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         deleteCookie("accessToken");
//         deleteCookie("refreshToken");
//       }
//     }
//     return Promise.reject(error);
//   }
// );
