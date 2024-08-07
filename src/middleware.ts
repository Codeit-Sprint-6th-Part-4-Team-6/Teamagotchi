import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.has("refreshToken");
  const { pathname } = request.nextUrl;

  switch (true) {
    // NOTE: 로그인 상태일 때 랜딩, login, register 페이지에 접근하면 /teams로 이동합니다.
    case isLoggedIn &&
      (pathname.startsWith("/login") || pathname.startsWith("/register") || pathname === "/"):
      return NextResponse.redirect(new URL("/teams", request.url));

    // NOTE: 비로그인 상태일 때 조건문안의 경로로 들어가면 로그인 페이지로 이동합니다.
    case !isLoggedIn &&
      (pathname.startsWith("/teams") ||
        pathname.startsWith("/add-team") ||
        pathname.startsWith("/join-team") ||
        pathname.startsWith("/reset-password") ||
        pathname.startsWith("/board") ||
        pathname.startsWith("/user")):
      return NextResponse.redirect(new URL("/login", request.url));

    default:
      return NextResponse.next();
  }
}
