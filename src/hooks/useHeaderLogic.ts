import { useEffect, useState } from "react";
import { Membership } from "@coworkers-types";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useAuth } from "@hooks/auth/useAuth";
import { useAuthStore } from "@store/useAuthStore";
import { getUser } from "@api/userApi";

export function useHeaderLogic() {
  const { isLoggedIn, logout } = useAuth();
  const { user } = useAuthStore();
  const router = useRouter();
  const { pathname, query } = router;

  const { data: userInfo, isPending } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    enabled: !!user,
  });

  const getCurTeamPage = () =>
    userInfo?.memberships?.find((group) => group.groupId.toString() === query.teamId);

  const [curTeamPage, setCurTeamPage] = useState<Membership | undefined>(getCurTeamPage);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isAuthPage = pathname === "/login" || pathname === "/register";

  const isRendingPage = pathname === "/";

  useEffect(() => {
    isLoggedIn();
  }, []);

  useEffect(() => {
    setCurTeamPage(getCurTeamPage());
  }, [userInfo?.memberships, query.teamId]);

  useEffect(() => {
    const handleRouteChange = () => {
      setSidebarOpen(false);
    };

    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router]);

  const handleSignOut = (): void => {
    alert("로그아웃 되었습니다.");
    logout();
  };

  return {
    isAuthPage,
    isRendingPage,
    userInfo,
    curTeamPage,
    isPending,
    sidebarOpen,
    setSidebarOpen,
    handleSignOut,
  };
}
