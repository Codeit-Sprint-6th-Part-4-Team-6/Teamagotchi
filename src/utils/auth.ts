import { AuthResponse } from "@coworkers-types";
import { setCookie } from "cookies-next";

export const setAuth = (data: AuthResponse) => {
  setCookie("accessToken", data.accessToken, { maxAge: 3600 });
  setCookie("refreshToken", data.refreshToken, { maxAge: 3600 * 12 * 7 });
};
