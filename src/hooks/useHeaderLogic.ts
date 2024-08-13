import { useEffect, useState } from "react";
import { Membership } from "@coworkers-types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useAuth } from "@hooks/auth/useAuth";
import { useAuthStore } from "@store/useAuthStore";
import { getUser } from "@api/userApi";
import { useToast } from "./useToast";

export function useHeaderLogic() {
  const { logout, setUserData } = useAuth();
  const { isLoggedIn } = useAuthStore();
  const router = useRouter();
  const { pathname, query } = router;
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: userInfo, isPending } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    enabled: isLoggedIn && !queryClient.getQueryData(["user"]), // 데이터가 캐싱되어 있다면 새로 요청하지 않음,
  });

  const getCurTeamPage = () =>
    userInfo?.memberships?.find((group) => group.groupId.toString() === query.teamId);

  const [curTeamPage, setCurTeamPage] = useState<Membership | undefined>(getCurTeamPage);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isAuthPage = pathname === "/login" || pathname === "/register";

  const isLandingPage = pathname === "/";

  useEffect(() => {
    setUserData();
  }, []);

  useEffect(() => {
    if (userInfo?.memberships && query.teamId) {
      setCurTeamPage(getCurTeamPage());
    }
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
    toast("success", "로그아웃에 성공했습니다.");
    logout();
  };

  return {
    isAuthPage,
    isLandingPage,
    userInfo,
    curTeamPage,
    isPending,
    sidebarOpen,
    setSidebarOpen,
    handleSignOut,
  };
}
