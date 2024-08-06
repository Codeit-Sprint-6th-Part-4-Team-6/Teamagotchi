import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.has("refreshToken");
  const { pathname } = request.nextUrl;

  // 로그인 상태일 때 랜딩, login, register 페이지에 접근하면 /team-list로 이동합니다.
  if (
    isLoggedIn &&
    (pathname.startsWith("/login") || pathname.startsWith("/register") || pathname === "/")
  ) {
    return NextResponse.redirect(new URL("/team", request.url));
  }

  // 비로그인 상태일 때 조건문안의 경로로 들어가면 로그인 페이지로 이동합니다.
  if (
    !isLoggedIn &&
    (pathname.startsWith("/add-team") ||
      pathname.startsWith("/join-team") ||
      pathname.startsWith("/team/") ||
      pathname.startsWith("/board/") ||
      pathname.startsWith("/add-board") ||
      pathname.startsWith("/my-page") ||
      pathname.startsWith("/my-history"))
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
